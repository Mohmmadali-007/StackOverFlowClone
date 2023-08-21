const Joi = require('joi');

exports.testValidator = {
  test: {
    message: Joi.string().required(),
  },
};
