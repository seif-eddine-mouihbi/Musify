/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

"use strict";

/**
 * node modules
 */
const queryString = require("querystring");

/**
 * custom modules
 */
const apiConfig = require("../config/api.config");
const utils = require("../utils/helpers.util");
const { getToken } = require("../api/auth.api");

const auth = (req, res) => {
  const /** {string} */ state = utils.generateRandomString(16);
  res.cookie(apiConfig.STATE_KEY, state);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: apiConfig.CLIENT_ID,
        scope: apiConfig.SCOPE,
        redirect_uri: apiConfig.REDIRECT_URI,
        state,
      })
  );
};

const callback = async (req, res) => {
  const MILLISECONDS = 1000;
  const ONE_WEEK = 604800000;

  const { code = null, state = null, error = null } = req.query;

  const /** {string} */ storedState = req.cookies[apiConfig.STATE_KEY];

  if (error || !state || state !== storedState) {
    return res.redirect("/login");
  } else {
    res.clearCookie(apiConfig.STATE_KEY);
    const response = await getToken(code);
    if (response.status === 200) {
      console.log(response.data);
    }
  }
};

module.exports = { auth, callback };
