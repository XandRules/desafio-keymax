'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [{
      login : 'admin',
      role : 'Administrador',
      password_hash : '$2a$08$F6inQYT5CI8fEzs760bZfuVV3rM0Z1p9X63ffLuRuZFIBYZRveXma', //senha padrão 123456
      created_at : new Date(),
      updated_at : new Date()
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', [{
      login :'admin'
    }])
  }
};