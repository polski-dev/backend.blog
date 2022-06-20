"use strict";

/**
 * ratings service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::ratings.ratings", ({ strapi }) => ({
  async addOrChange(postId, voice, userId) {
    const raiting = await strapi.db.query("api::ratings.ratings").findMany({ where: { post: postId, author: userId } });
    if (raiting?.length === 1 && raiting[0].voice === voice) return { data: raiting[0] };
    else if (raiting?.length) await strapi.db.query("api::ratings.ratings").delete({ where: { post: postId, author: userId } });
    return { data: await strapi.db.query("api::ratings.ratings").create({ data: { post: postId, author: userId, voice } }) };
  },
  async deleteRaitingUser(postId, userId) {
    const raiting = await strapi.db.query("api::ratings.ratings").findMany({ where: { post: postId, author: userId } });
    if (raiting?.length) return await strapi.db.query("api::ratings.ratings").delete({ where: { post: postId, author: userId } });
    return { data: raiting };
  },
}));
