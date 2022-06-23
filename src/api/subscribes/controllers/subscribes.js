"use strict";

/**
 *  user controller
 */

module.exports = {
  async amISubscribeUser(ctx) {
    const { id } = ctx.params;
    const userIdAuth = ctx.state.user.id;
    const trustUserId = parseInt(id);

    if (!trustUserId || !userIdAuth) {
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

    return (ctx.body = await strapi.service("api::users.users").amISubscribeUser(trustUserId, userIdAuth));
  },

  async changeUserSubscriptionStatus(ctx) {
    const { id } = ctx.params;
    const userIdAuth = ctx.state.user.id;
    const trustUserId = parseInt(id);

    if (!trustUserId || !userIdAuth) {
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

    return (ctx.body = await strapi.service("api::users.users").changeUserSubscriptionStatus(trustUserId, userIdAuth));
  },
};
