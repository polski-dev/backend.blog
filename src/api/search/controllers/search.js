"use strict";

/**
 * articles search router.
 */

module.exports = {
  async find(ctx, next) {
    const article = await strapi.db.query("api::articles.articles").findMany({
      where: {
        title: {
          $containsi: ctx.params.id,
        },
      },
      orderBy: {
        views: "desc",
      },
      limit: 15,
      populate: ["cover", "tags"],
      select: ["title", "views"],
    });

    const video = await strapi.db.query("api::video.video").findMany({
      where: {
        title: {
          $containsi: ctx.params.id,
        },
      },
      orderBy: {
        views: "desc",
      },
      limit: 15,
      populate: ["cover", "tags"],
      select: ["title", "views"],
    });

    const tag = await strapi.db.query("api::tags.tags").findMany({
      where: {
        title: {
          $containsi: ctx.params.id,
        },
      },
      orderBy: {
        views: "desc",
      },
      limit: 15,
      populate: ["cover"],
      select: ["title", "views"],
    });

    ctx.body = { article, video, tag };
  },
};
