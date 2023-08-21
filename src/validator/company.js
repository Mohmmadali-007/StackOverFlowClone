const Joi = require('joi');

exports.companyValidator = {
    add: {
        companyName: Joi.string().required(),
        companyType: Joi.string().required(),
        companySector: Joi.string().required(),
        taxationType: Joi.string().required(),
        taxNumber: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        website: Joi.string().required(),
        fax: Joi.string().required(),
    },
    edit: {
        id: Joi.number().required(),
        companyName: Joi.string().allow(),
        companyType: Joi.string().allow(),
        companySector: Joi.string().allow(),
        taxationType: Joi.string().allow(),
        taxNumber: Joi.string().allow(),
        email: Joi.string().allow(),
        phone: Joi.string().allow(),
        website: Joi.string().allow(),
        fax: Joi.string().allow(),
    },
    list: {
        id: Joi.number().allow(),
        companyName: Joi.string().allow(),
        companyType: Joi.string().allow(),
        companySector: Joi.string().allow(),
    },
    remove: {
        id: Joi.number().required(),
    },
    login: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    },
};
