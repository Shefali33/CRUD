`use strict`;
const userService = require("../services/user.service");

/**
 * Authentication
 * @param body
 * @returns {Promise<{data, status}|{message, status}>}
 */
async function authenticate(body) {
  try {
    return await userService.authenticate(body);
  } catch (error) {
    throw error;
  }
}

/**
 * Create Admin users
 * @param body
 * @returns {Promise<{data, status}|{message, status}>}
 */
async function register(body) {
  try {
    return await userService.create(body);
  } catch (error) {
    throw error;
  }
}

/**
 * Get user by id
 * @param body
 * @returns {Promise<void>}
 */
async function getUsers() {
  try {
    return await userService.getUsers();
  } catch (error) {
    throw error;
  }
}

/**
 * update user data
 * @param body
 */
async function update(body) {
  try {
    return await userService.update(body.id, body);
  } catch (error) {
    throw error;
  }
}

async function _delete(body) {
  try {
    return await userService.delete(body.id);
  } catch (error) {
    throw error;
  }
}


module.exports = {
  authenticate,
  register,
  _delete,
  update,
  getUsers
};
