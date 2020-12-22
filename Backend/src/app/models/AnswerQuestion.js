import Sequelize, {
  Model
} from 'sequelize';

class AnswerQuestion extends Model {
  static init(sequelize) {
    // migration de resposta de enquete
    super.init({
      question_id: Sequelize.NUMBER,
      answer_select: Sequelize.NUMBER,
      date: Sequelize.DATE,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {

    this.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question'
    });
  }

}
export default AnswerQuestion;
