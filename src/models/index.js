const Sequelize = require('sequelize');
const config = require('config');

// sequelize connect
exports.getSqlConnection = () => {
  let seqInstance = new Sequelize(
    config.get('DATABASE.NAME'),
    config.get('DATABASE.USER'),
    config.get('DATABASE.PASSWORD'),
    {
      host: config.get('DATABASE.HOST'),
      port: config.get('DATABASE.PORT'),
      dialect: config.get('DATABASE.DB_DIALECT'),
      // timezone: process.env.TIME_ZONE,
      freezeTableName: false,
      benchmark: false,
      // logging: (...msg) => console.log(msg),
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
    }
  );
  if (config.get('DATABASE.DEBUG') === 'true') {
    seqInstance
      .sync({ alter: false, force: false })
      // .authenticate()
      .then((r) => {
        console.log('Connection has been established successfully.');
      })
      .catch((error) => {
        console.log('Unable to connect to the database:', error);
        throw error;
      });
  }
  seqInstance = {
    Sequelize: Sequelize,
    seqInstance: seqInstance,
    Test: seqInstance.import('./models/test.model.js'),
    Log: seqInstance.import('./models/log.model.js'),
    User: seqInstance.import('./models/user.model.js'),
    Question: seqInstance.import('./models/question.model.js'),
  };
  return seqInstance;
};
