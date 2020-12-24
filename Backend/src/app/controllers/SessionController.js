import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const {
      username,
      password
    } = req.body;

    console.log(req.body);

    console.log("req.body", username)

    const user = await User.findOne({
      where: {
        login: username
      }
    });

    console.log(user);

    if (!user) {
      return res.status(500).json({
        message: 'Usuário não encontrado'
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(500).json({
        message: 'Senha não confere'
      });
    }
     

    return res.json({
      jwt: jwt.sign({
        id: user.id,
        username
      }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      role: user.role
    });
  }

}

export default new SessionController();
