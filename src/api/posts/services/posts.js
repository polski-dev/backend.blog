"use strict";

/**
 * articles service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::posts.posts", ({ strapi }) => ({
  async count(id) {
    let data = {};

    if (!!id) {
      data.ratings = {};
      data.ratings.best = await strapi.db.query("api::ratings.ratings").count({ where: { voice: "best", post: { id } } });
      data.ratings.wow = await strapi.db.query("api::ratings.ratings").count({ where: { voice: "wow", post: { id } } });
      data.ratings.wrr = await strapi.db.query("api::ratings.ratings").count({ where: { voice: "wrr", post: { id } } });
      data.ratings.count = data.ratings.best + data.ratings.wow + data.ratings.wrr;
      data.views = (await strapi.db.query("api::posts.posts").findOne({ select: ["views"], where: { id } })).views;
      data.comments = await strapi.db.query("plugin::comments.comment").count({ where: { related: `api::posts.posts:${id}` } });
    } else {
      data.publishedAllArticle = await strapi.db.query("api::posts.posts").count({ where: { typ: "article", publishedAt: { $null: false } } });
      data.unPublishedAllArticle = await strapi.db.query("api::posts.posts").count({ where: { typ: "article", publishedAt: { $null: true } } });
      data.allArticle = data.publishedAllArticle + data.unPublishedAllArticle;
      data.publishedAllVideo = await strapi.db.query("api::posts.posts").count({ where: { typ: "video", publishedAt: { $null: false } } });
      data.unPublishedAllVideo = await strapi.db.query("api::posts.posts").count({ where: { typ: "video", publishedAt: { $null: true } } });
      data.allVideo = data.publishedAllVideo + data.unPublishedAllVideo;
      data.all = data.allArticle + data.allVideo;
      data.publishedAll = data.publishedAllArticle + data.publishedAllVideo;
      data.unPublishedAll = data.unPublishedAllArticle + data.unPublishedAllVideo;
    }

    return { data };
  },

  async addViews(id) {
    if (!id) {
      ctx.status = 400;
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "Wrong field id",
          message: "You must add id in url",
          details: {},
        },
      });
    }
    const post = await strapi.db.query("api::posts.posts").findOne({ where: { id } });
    const views = await strapi.db.query("api::posts.posts").update({ where: { id }, data: { views: ++post.views } });

    return { data: views };
  },
}));
