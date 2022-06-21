"use strict";

/**
 *  user controller
 */

module.exports = {
  async count(ctx) {
    const { id } = ctx.params;

    const trustUserId = parseInt(id);

    if (!trustUserId) {
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

    return (ctx.body = await strapi.service("api::users.users").count(trustUserId));
  },

  async addViews(ctx) {
    const { id } = ctx.params;

    const trustUserId = parseInt(id);

    if (!trustUserId) {
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

    return (ctx.body = await strapi.service("api::users.users").addViews(trustUserId));
  },
};
