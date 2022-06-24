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
      data.publishedVideo = await strapi.db.query("api::posts.posts").count({ where: { id, typ: "video", publishedAt: { $null: false } } });
      data.unPublishedVideo = await strapi.db.query("api::posts.posts").count({ where: { id, typ: "video", publishedAt: { $null: true } } });
      data.publishedArticle = await strapi.db.query("api::posts.posts").count({ where: { id, typ: "article", publishedAt: { $null: false } } });
      data.unPublishedArticle = await strapi.db.query("api::posts.posts").count({ where: { id, typ: "article", publishedAt: { $null: true } } });
    } else data.tagsCount = await strapi.db.query("api::tags.tags").count({});

    return { data };
  },
}));
