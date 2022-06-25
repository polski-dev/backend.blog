"use strict";

/**
 *  searchs controller
 */

module.exports = {
  async find(ctx) {
    const { query } = ctx.params;

    if (!query) {
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

    return (ctx.body = await strapi.service("api::searchs.searchs").find(query));
  },
};
