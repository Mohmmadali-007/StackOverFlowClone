require('dotenv/config');
require('../initialize/config');
const express = require('express');
const imports = require('../initialize/imports');
const morgan = require('morgan');
const cors = require('cors');
const config = require('config');
const DbConn = require('../models/index');
const { saveLog } = require('../initialize/logger');
const DBConnection = DbConn.getSqlConnection();
global.DATABASE = DBConnection;

let app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const whitelist = []; // if empty then allowing all
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.length === 0 || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(
  express.urlencoded({
    extended: true,
  })
);



// Associations
require('./../models/associations')();
require('./../models/hooks')();
app.use(express.json());

imports.initialize(app);

app.listen(config.get('PORT'), () => {
  console.log(`Server Running on ${config.get('PORT')}`);
});
