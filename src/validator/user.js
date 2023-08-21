const Joi = require('joi');

exports.userValidator = {
    add: {
        userName: Joi.string().required(),
        userAdress: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
    },
    login: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    },
};
