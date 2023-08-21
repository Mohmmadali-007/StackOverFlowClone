const Joi = require('joi');

const inputRequests = {
  sign_in: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
  sign_up: {
    domain_name: Joi.allow(),
    parent_user_id: Joi.allow(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    job_title: Joi.string().allow(),
    organization_name: Joi.string().allow(),
  },
  add_new_user: {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    bio_data: Joi.allow(),
    user_type_code: Joi.string().required(),
    user_lang: Joi.allow(),
    status: Joi.string().required(),
    picture_url: Joi.string().allow(),
  },
  update_user: {
    id: Joi.number().required(),
    first_name: Joi.string().allow(),
    last_name: Joi.string().allow(),
    email: Joi.string().email().allow(),
    password: Joi.string().allow(),
    bio_data: Joi.allow(),
    user_type_code: Joi.string().allow(),
    user_lang: Joi.allow(),
    status: Joi.string().allow(),
    picture_url: Joi.string().allow(),
    domain_name: Joi.string().allow(),
  },
  create_role: {
    display_name: Joi.string().required(),
    is_active: Joi.boolean(),
    parent_role_code: Joi.allow(),
    role_code: Joi.allow(),
    organisation_id: Joi.allow(),
    category_code: Joi.string().allow(),
  },
  verify_otp: {
    userId: Joi.number(),
    userOtp: Joi.number().required(),
  },
};

module.exports = inputRequests;
