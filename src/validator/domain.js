const Joi = require('joi');

exports.domainValidator = {
  add: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    domainName: Joi.string().required(),
    organizationName: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.string().required(),
    password: Joi.string().required(),
  },
  list: {
    id: Joi.number().allow(),
    offset: Joi.number().allow(),
    limit: Joi.number().allow(),
  },
  update: {
    id: Joi.number().required(),
    firstName: Joi.string().allow(),
    lastName: Joi.string().allow(),
    domainName: Joi.string().allow(),
    organizationName: Joi.string().allow(),
    email: Joi.string().allow(),
    contact: Joi.string().allow(),
    password: Joi.string().allow(),
  },
  delete: {
    id: Joi.number().required(),
  },
  login: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
};
