"use strict";

/**
 * count router.
 */

module.exports = {
  async allArticle(ctx, next) {
    const articles = await strapi.db.query("api::articles.articles").count();
    ctx.body = { articles };
  },

  async bestArticle(ctx, next) {
    const articles = await (
      await strapi.db.query("api::articles.articles").findMany({ where: { waitingroom: false } })
    ).length;

    ctx.body = { articles };
  },

  async waitingRoomArticle(ctx, next) {
    const articles = await (
      await strapi.db.query("api::articles.articles").findMany({ where: { waitingroom: true } })
    ).length;

    ctx.body = { articles };
  },

  async allVideo(ctx, next) {
    const videos = await strapi.db.query("api::video.video").count();
    ctx.body = { videos };
  },

  async bestVideo(ctx, next) {
    const videos = await (await strapi.db.query("api::video.video").findMany({ where: { waitingroom: false } })).length;

    ctx.body = { videos };
  },

  async waitingRoomVideo(ctx, next) {
    const videos = await (await strapi.db.query("api::video.video").findMany({ where: { waitingroom: true } })).length;

    ctx.body = { videos };
  },

  async allComment(ctx, next) {
    const comment = await strapi.db.query("api::comments.comments").count();
    ctx.body = { comment };
  },
};
