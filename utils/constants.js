`use strict`;

`use strict`;

module.exports = {
  ResponseStatusCode: {
    Success: 200,
    NotFound: 404,
    Unauthorized: 401,
    BadRequest: 400,
  },
  //required in case soft delete
  UserStatus: {
    isActive: 1,
    isDeleted: 0,
  },
};
