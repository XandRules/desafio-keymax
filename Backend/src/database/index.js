import Sequelize from 'sequelize';

import User from '../app/models/User';
import Question from '../app/models/Question';

import databaseConfig from '../config/database';
import AnswerQuestion from '../app/models/AnswerQuestion';

const models = [
  AnswerQuestion,
  User,
  Question
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
