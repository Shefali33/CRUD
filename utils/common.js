`use strict`;

const Joi = require("joi");
const jwt = require(`jsonwebtoken`);
const { Config } = require(`../config`);
let commonFunctions = {};

/** Convert error to readable form **/
commonFunctions.convertErrorIntoReadableForm = (error) => {
  let errorMessage = "";
  if (error.message.indexOf("[") > -1) {
    errorMessage = error.message.substr(error.message.indexOf("["));
  } else {
    errorMessage = error.message;
  }
  errorMessage = errorMessage.replace(/"/g, "");
  errorMessage = errorMessage.replace("[", "");
  errorMessage = errorMessage.replace("]", "");
  error.message = errorMessage;
  return error;
};

/**
 * Joi authorization for swagger
 * @param msg
 * @returns {*}
 */
commonFunctions.authorization = (msg) => {
  return Joi.object({
    authorization: Joi.string().required().description(msg),
  }).unknown();
};

/**
 * Case sensitive search
 * @param queryText
 */
commonFunctions.caseInSensitiveObject = (queryText) => {
  return { $regex: "^" + queryText + "$", $options: "i" };
};

/**
 * Create jwt token
 * @param user
 * @param model
 * @returns {Buffer | Decimal | PassThrough | string | undefined | * | number | PromiseLike<ArrayBuffer>}
 */
commonFunctions.createJWTToken = (user) => {
  return jwt.sign({ sub: user.id }, Config.secret, { expiresIn: "12h" });
};

module.exports = commonFunctions;
