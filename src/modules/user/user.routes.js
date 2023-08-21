let Router = require('express').Router();
let controller = require('./user.controller');

Router.post('/add', controller.add);
Router.post('/login', controller.login);

module.exports = Router;
