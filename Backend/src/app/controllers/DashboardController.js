
import Question from '../models/Question';
import User from '../models/User';

class DashboardController {
 
  async index(req, res) {
   const question = await Question.findAll({
     limit : 5
   });

   res.json(question)
  }

}

export default new DashboardController();
