module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Question', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      question_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer_a: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer_b: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer_c: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer_d: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      survey_end: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      disabled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => {
    return queryInterface.dropTable('Question');
  },
};
