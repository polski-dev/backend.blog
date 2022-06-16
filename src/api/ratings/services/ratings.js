"use strict";

/**
 * ratings service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::ratings.ratings");
