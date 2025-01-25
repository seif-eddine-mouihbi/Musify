/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

"use strict";

/**
 * Add event on elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach((element) => {
    element.addEventListener(eventType, callback);
  });
};

export { addEventOnElements };
