/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

"use strict";

/**
 * custom modules
 */

const { getData } = require("../config/axios.config");

/**
 * Recommendations are generated based on the available information for a given seed entity
 * and matched against similar artists and tracks. If there is sufficient information
 * about the provided seeds, a list of tracks will be returned together with pool size details.
 *
 * @param {Object} req - server request object
 * @param {Object} id - object of artist or track seeds string
 * @returns {Object}
 */

// There is Bug In The API Request with endpoint Recommendations the status code is 404
// This bug is not of our work but is on the Spotify API
const getRecommendedAlbums = async (req, id) => {
  try {
    const {
      data: { albums: recommendedAlbum }
    } = await getData(`/albums?ids=${id}`, req.cookies.access_token);    
    return recommendedAlbum;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getRecommendedAlbums };
