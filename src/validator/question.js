const Joi = require('joi');

exports.questionValidator = {
  add: {
    tittle: Joi.string().required(),
    question: Joi.string().required(),
    answer: Joi.string().allow(),
    comment: Joi.string().allow(),
    userId : Joi.string().required()
  },
  list: {
    id: Joi.number().allow(),
    offset: Joi.number().allow(),
    limit: Joi.number().allow(),
  },
  edit: {
    id: Joi.number().required(),
    tittle: Joi.string().allow(),
    question: Joi.string().allow(),
    answer: Joi.string().allow(),
    comment: Joi.string().allow(),
  },
  delete: {
    id: Joi.number().required(),
  },
};
