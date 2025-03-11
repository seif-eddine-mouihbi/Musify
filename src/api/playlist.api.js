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

const getCategoriePlaylist = async (req, itemLimit) => {
  const { offset, limit, page } = getUrlQuery(req.params, itemLimit);
  const {categoryId = 'topLists'} = req.params

  const data = await getData(
    `/browse/categories/${categoryId}/playlists?limit=${limit}&offset=${offset}`,
    req.cookies.access_token
  );

  console.log(data);
};

module.exports = { getCategoriePlaylist };
