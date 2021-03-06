"use strict";

/**
 * tags service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::tags.tags", ({ strapi }) => ({
  async count(id) {
    let data = {};
    if (!!id) {
      data.views = (await strapi.db.query("api::tags.tags").findOne({ select: ["views"], where: { id } })).views;
      data.followTags = await strapi.db.query("plugin::users-permissions.user").count({ where: { followtags: { id } } });

      data.publishedArticle = await strapi.db.query("api::tags.tags").count({ where: { id, posts: { typ: "article" }, publishedAt: { $null: false } } });
      data.unPublishedArticle = await strapi.db.query("api::tags.tags").count({ where: { id, posts: { typ: "article" }, publishedAt: { $null: true } } });

      data.publishedVideo = await strapi.db.query("api::tags.tags").count({ where: { id, posts: { typ: "video" }, publishedAt: { $null: false } } });
      data.unPublishedVideo = await strapi.db.query("api::tags.tags").count({ where: { id, posts: { typ: "video" }, publishedAt: { $null: true } } });

      data.publishedPost = data.publishedArticle + data.publishedVideo;
      data.unPublishedPost = data.unPublishedArticle + data.unPublishedVideo;
    } else data.tagsCount = await strapi.db.query("api::tags.tags").count({});

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
    const tag = await strapi.db.query("api::tags.tags").findOne({ where: { id } });
    const views = await strapi.db.query("api::tags.tags").update({ where: { id }, data: { views: ++tag.views } });

    return { data: views };
  },
}));
