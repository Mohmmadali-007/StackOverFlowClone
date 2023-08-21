let Router = require('express').Router();
let controller = require('./question.controller');

Router.post('/add', controller.add);
Router.post('/list', controller.list);
Router.post('/edit', controller.edit);
Router.post('/delete', controller.delete);


module.exports = Router;