"use strict";

/**
 * articles comments router.
 */

module.exports = {
  async find(ctx, next) {
    ctx.body = await strapi.db.query("api::comments.comments").findMany({
      where: {
        article: { id: ctx.params.id },
      },
      populate: {
        grade: true,
      },
    });
  },

  async add(ctx, next) {
    ctx.body = await strapi.db.query("api::comments.comments").findMany({
      where: {
        article: { id: ctx.params.id },
      },
      populate: {
        grade: true,
      },
    });
  },
};
