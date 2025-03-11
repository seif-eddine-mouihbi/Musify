/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

'use strict';

/**
 * custom modules
 */

const { getData } = require('../config/axios.config');
const { getUrlQuery } = require('../utils/helpers.util');

/**
 * Recommendations are generated based on the available information for a given seed entity
 * and matched against similar artists and tracks. If there is sufficient information
 * about the provided seeds, a list of tracks will be returned together with pool size details.
 *
 * @param {Object} req - server request object
 * @param {Object} id - object of artist or track seeds string
 * @returns {Object}
 */

const getRecommendedAlbums = async (req, id) => {
  try {
    const {
      data: { albums: recommendedAlbum },
    } = await getData(`/albums?ids=${id}`, req.cookies.access_token);
    return recommendedAlbum;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get a list of new album releases featured in spotify
 *
 * @param {Object} req - server request object
 * @param {number} itemLimit - the maximum number of items to return. default: 20
 * @returns {Object}
 */
const getNewRelease = async (req, itemLimit) => {
  const { limit, offset, page } = getUrlQuery(req.params, itemLimit);

  const {
    data: { albums: newRelease },
  } = await getData(
    `/browse/new-releases?limit=${limit}&offset=${offset}`,
    req.cookies.access_token
  );

  return { baseUrl: req.baseUrl, page, ...newRelease };
};

module.exports = { getRecommendedAlbums, getNewRelease };
