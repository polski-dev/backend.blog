"use strict";

/**
 *  ratings controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::ratings.ratings", ({ strapi }) => ({
  async addOrChange(ctx) {
    if (!ctx?.request?.body?.postId || !ctx?.request?.body?.voice) {
      ctx.status = 400;
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "Wrong field postId or voice ",
          message: "You must add postId & voice in body",
          details: {},
        },
      });
    } else if (ctx?.request?.body?.voice != "best" && ctx?.request?.body?.voice != "wrr" && ctx?.request?.body?.voice != "wow") {
      ctx.status = 400;
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "Wrong field voice ",
          message: "voice must as 'best' or 'wrr' or 'wow' ",
          details: {},
        },
      });
    }

    const { postId, voice } = ctx?.request?.body;
    const userId = ctx.state.user.id;

    return (ctx.body = await strapi.service("api::ratings.ratings").addOrChange(postId, voice, userId));
  },

  async deleteRaitingUser(ctx) {
    if (!ctx?.request?.header?.postid && !parseInt(ctx?.request?.header?.postid)) {
      ctx.status = 400;
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "Wrong field postId ",
          message: "You must add postId in body",
          details: {},
        },
      });
    }

    const userId = ctx.state.user.id;

    return (ctx.body = await strapi.service("api::ratings.ratings").deleteRaitingUser(parseInt(ctx?.request?.header?.postid), userId));
  },
}));
