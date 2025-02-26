/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

"use strict";

/**
 * custom modules
 */
const apiConfig = require("../config/api.config");
const userApi = require("../api/user.api");
const playerApi = require("../api/player.api");
const trackApi = require("../api/track.api");

const home = async (req, res) => {
  // current user Profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks
  const recentlyPlayed = await playerApi.getRecentPlayed(req);
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

  // recommanded albums
  const trackIds =  recentlyPlayedTracks.map(({ id }) => id);
  const trackSeed =  trackIds.slice(0, 5).join(",");
  // console.log(trackIds);
  
  const recommendedAlbums = await trackApi.getRecommendedTrack(
    req,
    trackSeed,
    apiConfig.LOW_LIMIT
  );
  

  // console.log(recommendedAlbums);

  res.render("./pages/home", {
    currentProfile,
    // recommendedAlbums
  });
};

module.exports = { home };
