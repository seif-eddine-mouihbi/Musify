/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

"use strict";

/**
 * custom modules
 */
const userApi = require("../api/user.api");
const playerApi = require("../api/player.api");
const albumApi = require("../api/album.api");

const home = async (req, res) => {
  // current user Profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks
  const recentlyPlayed = await playerApi.getRecentPlayed(req);
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

  // recommanded tracks
  const trackIds = recentlyPlayedTracks.map(({ id }) => id);
  // console.log(trackIds);

  // recommended Albums
  const recentlyPlayedAlbums = recentlyPlayedTracks.map(({ album }) => album);
  const albumIds = recentlyPlayedAlbums
    .map(({ id }) => id)
    .slice(0, 10)
    .join(",");
  // console.log(albumIds);

  const recommendedAlbums = await albumApi.getRecommendedAlbums(req, albumIds);
  // console.log(recommendedAlbums);


  res.render("./pages/home", {
    currentProfile,
    recommendedAlbums,
  });
};

module.exports = { home };
