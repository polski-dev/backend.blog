"use strict";

/**
 * articles service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::posts.posts", ({ strapi }) => ({
  async count(id) {
    let data = {};

    if (!!id) {
      data.ratings = await strapi.db.query("api::ratings.ratings").count({ where: { post: { id } } });
      data.views = (await strapi.db.query("api::posts.posts").findOne({ select: ["views"], where: { id } })).views;
      data.comments = await strapi.db.query("plugin::comments.comment").count({ where: { related: `api::posts.posts:${id}` } });
    } else {
      data.publishedAllArticle = await strapi.db.query("api::posts.posts").count({ where: { typ: "article" }, publishedAt: { $null: false } });
      data.unPublishedAllArticle = await strapi.db.query("api::posts.posts").count({ where: { typ: "article" }, publishedAt: { $null: true } });
      data.allArticle = data.publishedAllArticle + data.unPublishedAllArticle;
      data.publishedAllVideo = await strapi.db.query("api::posts.posts").count({ where: { typ: "video" }, publishedAt: { $null: false } });
      data.unPublishedAllVideo = await strapi.db.query("api::posts.posts").count({ where: { typ: "video" }, publishedAt: { $null: true } });
      data.allVideo = data.publishedAllVideo + data.unPublishedAllVideo;
      data.all = data.allArticle + data.allVideo;
      data.publishedAll = data.publishedAllArticle + data.publishedAllVideo;
      data.unPublishedAll = data.unPublishedAllArticle + data.unPublishedAllVideo;
    }

    return { data };
  },
}));
