"use strict";

/**
 *  searchs controller
 */

module.exports = {
  async find(ctx) {
    const { query, page } = ctx.params;

    if (!query) {
      ctx.status = 400;
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "Wrong field query",
          message: "You must add query in url",
          details: {},
        },
      });
    } else if (!!page) {
      let turstPage = typeof page === "string" ? parseInt(page) : 0;
      return (ctx.body = await strapi.service("api::searchs.searchs").find(query, turstPage));
    } else return (ctx.body = await strapi.service("api::searchs.searchs").find(query));
  },
};
