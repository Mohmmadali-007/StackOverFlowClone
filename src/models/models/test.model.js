const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let Test = sequelize.define(
    'test',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      indexes: [],
      timestamps: true,
    }
  );

  return Test;
};
