const { SALT_LENGTH } = require('../../config/default');
const constants = require('../../utils/constants');
const { generateString } = require('../../utils/string_generate');
const { validateRequestInput } = require('../../validator');
const { userValidator } = require('../../validator/user');
const bcrypt = require('bcrypt');
const { createJwtToken } = require('../../middlewares/permissions');
const { query } = require('express');

// Add recod to user Table
exports.add = async (request, response) => {
  try {
    const requestData = request.body;
    const validateRequest = validateRequestInput(userValidator.add, requestData);
    if (!validateRequest.isValid) {
      return response.status(constants.CODES.VALIDATION_FAILED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.VALIDATION_FAILED,
        data: validateRequest.error,
      });
    }
    const emailCheck = await DATABASE.User.findAll({ where: { email: requestData.email } });
    if (emailCheck[0]) {
      return response.status(constants.CODES.BAD_REQUEST).send({
        success: false,
        message: 'Email allredy Exist',
      });
    }
    const phoneCheck = await DATABASE.User.findAll({ where: { phone: requestData.phone } });
    if (phoneCheck[0]) {
      return response.status(constants.CODES.BAD_REQUEST).send({
        success: false,
        message: 'phone number allredy Exist',
      });
    }

    const encryptedUserPassword = await bcrypt.hash(requestData.password, SALT_LENGTH);
    requestData.password = encryptedUserPassword;

    const user = await DATABASE.User.create({
      userName: requestData.userName,
      userAdress: requestData.userAdress,
      email: requestData.email,
      password: requestData.password,
      phone: requestData.phone,
    });

    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.USERS.USER_ADDED,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: error.message,
    });
  }
};

// Login API
exports.login = async (request, response) => {
  try {
    const requestData = request.body;
    const validateRequest = validateRequestInput(userValidator.login, requestData);
    if (!validateRequest.isValid) {
      return response.status(constants.CODES.VALIDATION_FAILED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.VALIDATION_FAILED,
        data: validateRequest.error,
      });
    }
    const user = await DATABASE.User.findOne({
      where: { email: requestData.email },
    });
    if (user) {
      if (!bcrypt.compareSync(requestData.password, user.password)) {
        return response.status(constants.CODES.UNAUTHORIZED).send({
          success: false,
          message: constants.MESSAGES.UNAUTHORIZED_ACCESS,
        });
      } else {
        const tokenGenerate = createJwtToken(user.dataValues);
        console.log(tokenGenerate);
        return response.status(constants.CODES.SUCCESS).send({
          success: true,
          token: tokenGenerate,
        });
      }
    } else {
      return response.status(constants.CODES.UNAUTHORIZED).send({
        success: false,
        message: constants.MESSAGES.USERS.NOT_FOUND,
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
