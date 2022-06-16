"use strict";

/**
 * count router.
 */

module.exports = {
  async viewsArticle(ctx, next) {
    const article = await strapi.db.query("api::posts.posts").findOne({ where: { id: ctx.params.id } });
    const { views } = await strapi.db.query("api::posts.posts").update({ where: { id: ctx.params.id }, data: { views: article.views + 1 } });
    ctx.body = { data: { views } };
  },

  async viewsVideo(ctx, next) {
    const video = await strapi.db.query("api::video.video").findOne({ where: { id: ctx.params.id } });
    const { views } = await strapi.db.query("api::video.video").update({ where: { id: ctx.params.id }, data: { views: video.views + 1 } });
    ctx.body = { data: { views } };
  },

  async viewsUser(ctx, next) {
    const user = await strapi.db.query("plugin::users-permissions.user").findOne({ where: { id: ctx.params.id } });
    const { views } = await strapi.db.query("plugin::users-permissions.user").update({ where: { id: ctx.params.id }, data: { views: user.views + 1 } });
    ctx.body = { data: { views } };
  },

  async viewsTag(ctx, next) {
    const tag = await strapi.db.query("api::tags.tags").findOne({ where: { id: ctx.params.id } });
    const { views } = await strapi.db.query("api::tags.tags").update({ where: { id: ctx.params.id }, data: { views: tag.views + 1 } });
    ctx.body = { data: { views } };
  },
};
