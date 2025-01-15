/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

"use strict";

/**
 * custom modules
 */

const home = (req, res) => {
  res.render("./pages/home");
};

module.exports = { home };
