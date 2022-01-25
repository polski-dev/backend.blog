"use strict";

/**
 * articles router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::articles.articles", {
  method: "GET",
  path: "/:id/comment",
  handler: "articles.comments",
  config: {
    policies: [],
  },
});
