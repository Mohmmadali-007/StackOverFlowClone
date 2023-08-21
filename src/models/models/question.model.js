const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let Question = sequelize.define(
    'question',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tittle: {
        type: Sequelize.STRING(100),
      },
      question: {
        type: Sequelize.STRING(200),
      },
      answer: {
        type: Sequelize.STRING(500),
      },
      comment: {
        type: Sequelize.STRING(500),
      },
      userId: {
        type: Sequelize.INTEGER(20),
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      indexes: [],
    }
  );

  return Question;
};
