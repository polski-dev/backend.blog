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

  async addViews(ctx) {
    const { id } = ctx.params;
    const numberId = parseInt(id);

    if (!numberId) {
      ctx.status = 400;
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "Wrong field id  ",
          message: "You must add id in url",
          details: {},
        },
      });
    }

    return (ctx.body = await strapi.service("api::tags.tags").addViews(numberId));
  },
}));
