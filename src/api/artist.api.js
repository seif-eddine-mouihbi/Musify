/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

'use strict';

/**
 * Custom modules
 */

const { getData } = require('../config/axios.config');
const apiConfig = require('../config/api.config');

/**
 * Get Spotify catalog information for several artists based on their Spotify IDs
 *
 * @param {Object} req - server request object
 * @param {string} artistId - A comma-separated list of the Spotify IDs for the artists.
 * Maximum: 50 IDs
 * @returns {Object}
 */
const getSeveralDetail = async (req, artistId) => {
  const { data: trackArtists } = await getData(
    `/artists?ids=${artistId}`,
    req.cookies.access_token
  );
  return trackArtists;
};

module.exports = { getSeveralDetail };
