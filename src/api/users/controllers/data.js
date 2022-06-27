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
    return (ctx.body = await strapi.service("api::users.dataget").dataEmailRead(ctx));
  },

  async dataEmailUpdate(ctx) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(ctx.request.body.email)) {
      ctx.status = 400;
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "Wrong field email",
          message: "You must add good email",
          details: {},
        },
      });
    }

    const isEmailUnique = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: { email: ctx.request.body.email },
    });

    if (!!isEmailUnique) {
      ctx.status = 400;
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "Email is uses",
          message: "Failed update field becouse email is uses",
          details: {},
        },
      });
    }

    return (ctx.body = await strapi.service("api::users.dataupdate").dataEmailUpdate(ctx));
  },

  async dataPasswordUpdate(ctx) {
    return (ctx.body = await strapi.service("api::users.dataupdate").dataPasswordUpdate());
  },

  async dataUserDelete(ctx) {
    return (ctx.body = await strapi.service("api::users.dataupdate").dataUserDelete());
  },
};
