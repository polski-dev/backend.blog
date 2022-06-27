"use strict";

/**
 *  user data controller
 */

module.exports = {
  async dataAvatarUpdate(ctx) {
    const type = ctx?.request?.files?.avatar?.type;
    if (ctx.is("multipart/form-data") && (type === "image/png" || type === "image/jpg" || type === "image/jpeg")) return (ctx.body = await strapi.service("api::users.dataupdate").dataAvatarUpdate(ctx));

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
  },

  async dataPublicRead(ctx) {
    return (ctx.body = await strapi.service("api::users.dataget").dataPublicRead(ctx));
  },

  async dataPublicUpdate(ctx) {
    return (ctx.body = await strapi.service("api::users.dataupdate").dataPublicUpdate(ctx));
  },

  async dataEmailRead(ctx) {
    return (ctx.body = await strapi.service("api::users.dataget").dataEmailRead());
  },

  async dataEmailUpdate(ctx) {
    return (ctx.body = await strapi.service("api::users.dataupdate").dataEmailUpdate());
  },

  async dataPasswordUpdate(ctx) {
    return (ctx.body = await strapi.service("api::users.dataupdate").dataPasswordUpdate());
  },

  async dataUserDelete(ctx) {
    return (ctx.body = await strapi.service("api::users.dataupdate").dataUserDelete());
  },
};
