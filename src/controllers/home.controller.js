/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

"use strict";

/**
 * custom modules
 */
const userApi = require("../api/user.api");

const home = async (req, res) => {
  // current user Profile
  const currentProfile = await userApi.getProfile(req);
  res.render("./pages/home", {
    currentProfile
  });
};

module.exports = { home };
