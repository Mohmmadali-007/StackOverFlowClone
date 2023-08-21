const Router = require('express').Router();
const controller = require('./test.controller');
/**
 * 
 * @typedef AddTest
 * @property {string} message - eg: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
/**
 * @typedef AddTestResponse
 * @property {boolean} success - eg: true
 * @property {string} message - eg: Test record created
 * @property {AddTest.model} data
 */
/**
 * @route POST /test/add
 * @group Test Module
 * @param {AddTest.model} data.body - Add test
 * @returns {AddTestResponse.model} 200 - Response object with the key 'message'
 * @produces application/json
 * @consumes application/json
 */
Router.post('/add', controller.add);

module.exports = Router;
