const jwt = require('jsonwebtoken');
const config = require('config');
const constants = require('../utils/constants');

exports.verifyToken = (request, response, next) => {
  try {
    if (!request.headers['authorization']) {
      return response.status(constants.CODES.UNAUTHORIZED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.UNAUTHORIZED_ACCESS,
      });
    }
    const accessToken = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(accessToken, config.get('JWT_SECRET'));
    request.user = decoded;
    return next();
  } catch (error) {
    return response.status(constants.CODES.UNAUTHORIZED).send({
      success: false,
      message: constants.MESSAGES.GENERAL.UNAUTHORIZED_ACCESS,
      error: error,
    });
  }
};

exports.systemAdmin = (request, response, next) => {
  try {
    if (request.user.role !== constants.ROLES.SYSTEM) {
      return response.status(constants.CODES.UNAUTHORIZED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.UNAUTHORIZED_ACCESS,
      });
    }
    return next();
  } catch (error) {
    return response.status(constants.CODES.UNAUTHORIZED).send({
      success: false,
      message: constants.MESSAGES.GENERAL.UNAUTHORIZED_ACCESS,
      error: error,
    });
  }
};

module.exports.createJwtToken = (payload) => {
  let token = jwt.sign(payload, config.get('JWT_SECRET'), {
    expiresIn: config.get('JWT_EXPIRY'),
  });
  return token;
};
