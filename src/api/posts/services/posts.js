"use strict";

/**
 * articles service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::posts.posts");
