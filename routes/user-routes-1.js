`use strict`;

const Joi = require(`joi`);
const {
  convertErrorIntoReadableForm,
  authorization,
} = require(`../utils/common`);
const { AuthorizationToken } = require(`../utils/static-messages`);
const {
  authenticate,
  register,
  _delete,
  update,
  getUsers,
} = require(`../controllers/users.controller`);

let Routes = [
  {
    method: `POST`,
    path: `/users/authenticate`,
    joiSchemaForSwagger: {
      body: {
        username: Joi.string()
          .required()
          .description(`Enter username`)
          .label(`Username`),
        password: Joi.string()
          .required()
          .description(`Enter password`)
          .label(`Password`),
      },
      group: `User`,
      description: `User authentication`,
      model: `User authentication`,
      responseClass: `Success`,
    },
    auth: false,
    failAction: convertErrorIntoReadableForm,
    handler: authenticate,
  },

  {
    method: `POST`,
    path: `/users/register`,
    joiSchemaForSwagger: {
      body: {
        name: Joi.string().optional().description(`Enter name`).label(`Name`),
        username: Joi.required()
          .description(`Enter User Name`)
          .label(`User Name`),
        email: Joi.string()
          .email()
          .required()
          .description(`Enter email id`)
          .label(`Email Id`),
        password: Joi.string()
          .required()
          .description(`Enter password`)
          .label(`Password`),
        description: Joi.string()
          .optional()
          .description(`Enter description`)
          .label(`Description`),
      },
      group: `User`,
      description: `Create new user`,
      model: `User`,
      responseClass: `Success`,
    },
    auth: false,
    failAction: convertErrorIntoReadableForm,
    handler: register,
  },

  {
    method: `GET`,
    path: `/users`,
    joiSchemaForSwagger: {
      params: {},
      // If any search criteria or pagination is required.
      query: {},
      headers: authorization(AuthorizationToken),
      group: `User`,
      description: `Get all users`,
      model: `Get all users`,
      responseClass: `Success`,
    },
    auth: true,
    failAction: convertErrorIntoReadableForm,
    handler: getUsers,
  },

  {
    method: `PUT`,
    path: `/users/:id`,
    joiSchemaForSwagger: {
      params: {
        id: Joi.string()
          .required()
          .description(`Enter user id `)
          .label(`User id`),
      },
      body: {
        name: Joi.string().optional().description(`Enter name`).label(`Name`),
        username: Joi.string()
          .description(`Enter User Name`)
          .label(`User Name`),
        email: Joi.string()
          .email()
          .description(`Enter email id`)
          .label(`Email Id`),
        password: Joi.string()
          .optional()
          .description(`Enter password`)
          .label(`Password`),
        description: Joi.string()
          .optional()
          .description(`Enter description`)
          .label(`Description`),
      },

      headers: authorization(AuthorizationToken),
      group: `User`,
      description: `Update user data according to id API`,
      model: `Update user data`,
      responseClass: `Success`,
    },
    auth: true,
    failAction: convertErrorIntoReadableForm,
    handler: update,
  },

  {
    method: `DELETE`,
    path: `/users/:id`,
    joiSchemaForSwagger: {
      params: {
        id: Joi.string()
          .required()
          .description(`Enter user id `)
          .label(`User id`),
      },
      headers: authorization(AuthorizationToken),
      group: `User`,
      description: `Delete user data according to id API`,
      model: `Update user data`,
      responseClass: `Success`,
    },
    auth: true,
    failAction: convertErrorIntoReadableForm,
    handler: _delete,
  },
];

module.exports = Routes;
