"use strict";

/**
 * articles search router.
 */

module.exports = {
  async find(ctx, next) {
    const article = await strapi.db.query("api::articles.articles").findMany({
      select: ["title"],
      where: {
        title: {
          $containsi: ctx.params.id,
        },
      },
    });

    const tag = await strapi.db.query("api::tags.tags").findMany({
      select: ["title"],
      where: {
        title: {
          $containsi: ctx.params.id,
        },
      },
    });

    ctx.body = { article, tag };
  },
};
