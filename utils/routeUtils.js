"use strict";

/** modules **/

const Joi = require("joi");

const { ServerConfig } = require("../config");
const {
  SomethingWentWrong,
  BackgroundProcess,
} = require("../utils/static-messages");
const { ResponseStatusCode } = require("../utils/constants");
const { convertErrorIntoReadableForm } = require("./common");

const { authenticationUser } = require("../_helpers/jwt_authentication");
let routeUtils = {};

/**function to create routes with validation in the express.**/
routeUtils.route = async (app, routes = []) => {
  routes.forEach(async (route) => {
    /** set middleware array for each route **/
    let middlewares = [getValidatorMiddleware(route)];
    middlewares = await assignUserAuth(middlewares, route);

    /** Create api route **/
    app
      .route(route.path)
      [route.method.toLowerCase()](
        ...middlewares,
        getHandlerMethod(route.handler, route.joiSchemaForSwagger)
      );
  });


};

/**
 * function to validate request body/params/query/headers with joi schema to validate a request is valid or not.
 * @param {*} request
 * @param {*} route
 */
let joiValidatorMethod = async (request, route) => {
  if (
    route.joiSchemaForSwagger.params &&
    Object.keys(route.joiSchemaForSwagger.params).length
  ) {
    request.params = await Joi.validate(
      request.params,
      route.joiSchemaForSwagger.params
    );
  }
  if (
    route.joiSchemaForSwagger.body &&
    Object.keys(route.joiSchemaForSwagger.body).length
  ) {
    request.body = await Joi.validate(
      request.body,
      route.joiSchemaForSwagger.body
    );
  }
  if (
    route.joiSchemaForSwagger.query &&
    Object.keys(route.joiSchemaForSwagger.query).length
  ) {
    request.query = await Joi.validate(
      request.query,
      route.joiSchemaForSwagger.query
    );
  }
  if (
    route.joiSchemaForSwagger.headers &&
    route.joiSchemaForSwagger.headers.authorization &&
    Object.keys(route.joiSchemaForSwagger.headers).length
  ) {
    request.headers = await Joi.validate(
      request.headers,
      route.joiSchemaForSwagger.headers
    );
  }
};

/**
 * middleware to validate request body/params/query/headers with JOI.
 * @param {*} route
 */
let getValidatorMiddleware = (route) => {
  return (request, response, next) => {
    joiValidatorMethod(request, route)
      .then((result) => {
        return next();
      })
      .catch((err) => {
        let error = convertErrorIntoReadableForm(err);
        let responseObject = {
          status: ResponseStatusCode.BadRequest,
          message: error.message,
        };
        return response.status(responseObject.status).json(responseObject);
      });
  };
};

/**
 * Get route handler and handle the api response commonly
 * @param {*} handler
 * @param {*} JoiJSON
 */
let getHandlerMethod = (handler, JoiJSON) => {
  return async (request, response) => {
      let body = {
        ...(request.body || {}),
        ...(request.params || {}),
        ...(request.query || {}),
        user: (request || {}).user || {},
        host: (request.headers || {}).host,
        remoteAddress:
          request.headers["x-forwarded-for"] ||
          request.connection.remoteAddress,
      };
      if (JoiJSON.responseObject) {
        body["response"] = response;
      }
      handler(body)
        .then((result) => {
          if (!result) {
            throw {
              status: ResponseStatusCode.BackgroundProcess,
              message: BackgroundProcess,
            };
          }
          response.status(result.status).json(result);
        })
        .catch(async (err) => {
          if (!err.status && !err.code && !err.status) {
            err = {
              status: ResponseStatusCode.BadRequest,
              message: SomethingWentWrong,
            };
          }
          err = await errorObj(err);

          /** Background process end code **/
          if (err.status === ResponseStatusCode.BackgroundProcess) return;
          response.status(err.status).json(err);
        });
  };
};



/**
 * Assign authentication function
 * @param {*} middlewares
 * @param {*} route
 * @returns {Promise<void>}
 */
const assignUserAuth = async (middlewares, route) => {
  if (route.auth) {
    middlewares.push(await authenticationUser());
  }
  return middlewares;
};

/**
 * Error message object
 * @param err
 * @returns {Promise<*>}
 */
const errorObj = async (err) => {
  let errMessage =
    (err || {}).message || (err || {}).errmsg || "Something went wrong!";
  let statusCode = (err || {}).status || 0;
  err = { status: statusCode, message: errMessage };
  return err;
};



module.exports = routeUtils;
