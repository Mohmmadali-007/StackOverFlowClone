const constants = require('../../utils/constants');
const { validateRequestInput } = require('../../validator');
const { testValidator } = require('../../validator/test');

exports.add = async (request, response) => {
  try {
    const requestData = request.body;
    const validateRequest = validateRequestInput(testValidator.test, requestData);
    if (!validateRequest.isValid) {
      // console.log(validateRequest);
      return response.status(constants.CODES.VALIDATION_FAILED).send({
        success: false,
        message: constants.MESSAGES.GENERAL.VALIDATION_FAILED,      
        data: validateRequest.error,
      });
    }

    const test = await DATABASE.Test.create({ message: requestData.message });

    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.TEST.CREATED,
      data: test,
    });
  } catch (error) {
    console.log(error);
    return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: error.message,
    });
  }
};
