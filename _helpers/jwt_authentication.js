`use strict`;

const config = require("../config/config");
const { getOneDoc, updateData } = require("../services/db-queries.service");
const staticMessage = require("../utils/static-messages");
const { ResponseStatusCode } = require("../utils/constants");
const { User } = require("./db");
const secret = config.secret;
const JWT = require("jsonwebtoken");

/**
 * User authentication
 * @returns {Promise<Function>}
 */
const authenticationUser = async () => {
  return async (request, response, next) => {
    let token = (request.headers.authorization || "").split(" ");
    try {
      let user = JWT.verify(token[1] || "", secret);
      if (user.sub) {
        request.user = user;
        let criteria = { token_manager: token[1], _id: user.sub },
          projection = { __v: 0 },
          options = { lean: true };

        users = await getOneDoc(User, criteria, projection, options, true);

        if (user) {
          return next();
        }
        throw null;
      }
      throw null;
    } catch (e) {
      if ((token || []).length) {
        let criteria = { token_manager: { $all: token[0] } },
          options = { lean: true };
        await updateData(
          User,
          criteria,
          { $set: { token_manager: [] } },
          options
        );
      }
      return response.status(ResponseStatusCode.Unauthorized).json({
        status: ResponseStatusCode.Unauthorized,
        message: staticMessage.Unauthorized,
      });
    }
  };
};

module.exports = {
  authenticationUser,
};
