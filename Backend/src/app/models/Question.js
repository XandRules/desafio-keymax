import Sequelize, {
  Model
} from 'sequelize';

class Question extends Model {
  static init(sequelize) {
    // migration de Propriedades
    super.init({
      question_title: Sequelize.STRING,
      user_id: Sequelize.NUMBER,
      answer_a: Sequelize.NUMBER,
      answer_b: Sequelize.NUMBER,
      answer_c: Sequelize.NUMBER,
      answer_d: Sequelize.NUMBER,
      survey_end: Sequelize.STRING,

    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  }
}
export default Question;
