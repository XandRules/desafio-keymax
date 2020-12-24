import * as Yup from 'yup';

import AnswerQuestion from '../models/AnswerQuestion';

class AnswerQuestionController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        question_id : Yup.number().required(),
        answer_select :Yup.string().required(),

      });
  
      console.log(req.body)
  
      if (!(await schema.isValid(req.body))) {
        return res.status(500).json({message: 'Validation fail'});
      }

      req.body.date = new Date();

      console.log(req.body);

      const answerQuestion = await AnswerQuestion.create(req.body);

      console.log(answerQuestion)

      return res.json(answerQuestion);
      
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }
  }  

  async index(req, res) {
    const answerQuestion = await AnswerQuestion.findAll();

    return res.json(answerQuestion);
  }

}

export default new AnswerQuestionController();
