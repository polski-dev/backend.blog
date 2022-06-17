"use strict";

/**
 *  posts controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::posts.posts", ({ strapi }) => ({
  async count(ctx) {
    const { id } = ctx.params;
    return (ctx.body = await strapi.service("api::posts.posts").count(id));
  },
}));
