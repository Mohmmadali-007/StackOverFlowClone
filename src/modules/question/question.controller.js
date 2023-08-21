const { SALT_LENGTH } = require('../../config/default');
const constants = require('../../utils/constants');
const { generateString } = require('../../utils/string_generate');
const { validateRequestInput } = require('../../validator');
const { questionValidator } = require('../../validator/question');
const bcrypt = require('bcrypt');
const { createJwtToken } = require('../../middlewares/permissions');
const { query } = require('express');

// Add recod to question Table
exports.add = async (request, response) => {
  try {
    const requestData = request.body;
    const validateRequest = validateRequestInput(questionValidator.add, requestData);
    if (!validateRequest.isValid) {
      return response.status(constants.CODES.VALIDATION_FAILED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.VALIDATION_FAILED,
        data: validateRequest.error,
      });
    }
    const question =  await DATABASE.Question.create(requestData);

    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.QUESTION.CREATED,
      data: question,
    });
  } catch (error) {
    console.log(error);
    return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: error.message,
    });
  }
};

// Update data
exports.edit = async (request, response) => {
  try {
    const requestData = request.body;
    const validateRequest = validateRequestInput(questionValidator.edit, requestData);
    if (!validateRequest.isValid) {
      return response.status(constants.CODES.VALIDATION_FAILED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.VALIDATION_FAILED,
        data: validateRequest.error,
      });
    }

    const question = await DATABASE.Question.findOne({
      where: { id: requestData.id },
    });
    if (question) {
      await DATABASE.Question.update(
        {
          id: requestData.id,
          tittle: requestData.tittle,
          question: requestData.question,
          answer: requestData.answer,
          comment: requestData.comment,
        },
        { where: { id: requestData.id } }
      );
      return response.status(constants.CODES.SUCCESS).send({
        success: true,
        message: constants.MESSAGES.QUESTION.UPDATED,
      });
    } else {
      return response.status(constants.CODES.NOT_FOUND).send({
        success: false,
        message: constants.MESSAGES.QUESTION.NOT_FOUND,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: error.message,
    });
  }
};

// List the record from Database
exports.list = async (request, response) => {
  try {
    const requestData = request.body;
    const validateRequest = validateRequestInput(questionValidator.list, requestData);
    if (!validateRequest.isValid) {
      return response.status(constants.CODES.VALIDATION_FAILED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.VALIDATION_FAILED,
        data: validateRequest.error,
      });
    }
    let options = {
      where: {},
      offset: requestData.offset,
      limit: requestData.limit,
    };
    if (requestData.offset) options.offset = requestData.offset;
    if (requestData.limit) options.limit = requestData.limit;
    if (requestData.id) {
      options.where.id = requestData.id;
    }
    const question = await DATABASE.Question.findAll(options);
    if (!question) {
      return response.status(constants.CODES.NOT_FOUND).send({
        success: false,
        message: constants.MESSAGES.QUESTION.NOT_FOUND,
        data: [],
      });
    } else {
      response.status(constants.CODES.SUCCESS).send({
        success: true,
        message: constants.MESSAGES.QUESTION.LIST,
        data: question,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: error.message,
    });
  }
};

// Delete the user
exports.delete = async (request, response) => {
  try {
    const requestData = request.body;
    const validateRequest = validateRequestInput(questionValidator.delete, requestData);
    if (!validateRequest.isValid) {
      return response.status(constants.CODES.VALIDATION_FAILED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.VALIDATION_FAILED,
        data: validateRequest.error,
      });
    }
    const question = await DATABASE.Question.findAll({
      where: { id: requestData.id },
    });
    if (question.length > 0) {
      await DATABASE.Question.destroy({ where: { id: requestData.id } });
      response.status(constants.CODES.SUCCESS).send({
        success: true,
        message: constants.MESSAGES.QUESTION.DELETED,
      });
    } else {
      return response.status(constants.CODES.NOT_FOUND).send({
        success: false,
        message: constants.MESSAGES.question.NOT_FOUND,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: error.message,
    });
  }
};

