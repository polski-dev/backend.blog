"use strict";

/**
 *  tags controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::tags.tags", ({ strapi }) => ({
  async count(ctx) {
    const { id } = ctx.params;
    return (ctx.body = await strapi.service("api::tags.tags").count(id));
  },
}));
