import * as Yup from 'yup';

import Question from '../models/Question';

class QuestionController {

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        question_title : Yup.string().required(),
        answer_a :Yup.string().required(),
        answer_b :Yup.string().required(),
        answer_c : Yup.string(),
        answer_d : Yup.string(),
        survey_end : Yup.boolean().default(false),
  
      });
  
      console.log(req.body)
  
      if (!(await schema.isValid(req.body))) {
        return res.status(500).json({message: 'Validation fail'});
      }
  
      const newQuestion = await Question.create(req.body);    

      console.log(newQuestion)
  
      return res.json({
        newQuestion
      });
      
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
    const question = await Question.findAll();

    return res.json(question);
  }
  
  async indexById(req, res) {
    const question = await Question.findAll({
      where :{
        id: req.params.id
      }
    });

    return res.json(question);
  }
  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        question_title : Yup.string().required(),
        answer_a :Yup.string().required(),
        answer_b :Yup.string().required(),
        answer_c : Yup.string(),
        answer_d : Yup.string(),
        survey_end : Yup.boolean().default(false),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });
      
      const question = await Question.findByPk(req.params.id);

      if (!question) {
        return res.status(500).json({
          error: 'Questionário não encontrada'
        });
      }


      const questionUpdated = await question.update(
        req.body
      );

      return res.json(questionUpdated);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }

  }

  async delete(req, res) {

    try {
      const question = await Question.findByPk(req.params.id);

      if (!question) {
        return res.status(500).json({
          error: 'Questionário não encontrado'
        });
      }


      const response = await Question.destroy({
        where: {
          id: req.params.id
        }
      });

      return res.json(response);

    } catch (error) {
      return res.json({
        error: error
      });
    }

  }

}

export default new QuestionController();
