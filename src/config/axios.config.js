/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

"use strict";

/**
 * node modules
 */
const axios = require("axios");
const queryString = require("querystring");

/**
 * custom modules
 */
const apiConfig = require("./api.config");

/**
 * axios instance for access token and refresh token request
 */

const token = axios.create({
  baseURL: apiConfig.TOKEN_BASE_URL,
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(
        apiConfig.CLIENT_ID + ":" + apiConfig.CLIENT_SECRET
      ).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

module.exports = { token };
