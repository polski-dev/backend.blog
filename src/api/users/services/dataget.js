"use strict";

/**
 *  user data service
 */

module.exports = {
  async dataPublicRead(ctx) {
    const data = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: { id: ctx.state.user.id },
      populate: {
        avatar: {
          select: ["url"],
        },
      },
      select: ["id", "username", "blocked", "views", "createdAt", "updatedAt", "about", "website", "youtube", "instagram", "tiktok", "github", "city", "country"],
    });

    return { data };
  },

  async dataEmailRead(ctx) {
    const data = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: { id: ctx.state.user.id },
      select: ["id", "username", "email"],
    });

    return { data };
  },
};
