const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let Log = sequelize.define(
    'log',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      service_name: {
        type: Sequelize.STRING(100),
      },
      api_route: {
        type: Sequelize.STRING(100),
      },
      request_body: {
        type: Sequelize.STRING(500),
      },
      response_status_code: {
        type: Sequelize.INTEGER,
      },
      response_data: {
        type: Sequelize.TEXT('long'),
      },
      execution_time_in_ms: {
        type: Sequelize.INTEGER,
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

  return Log;
};
