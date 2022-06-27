"use strict";
const bcrypt = require("bcryptjs");

/**
 *  user data service
 */

module.exports = {
  async dataAvatarUpdate(ctx) {
    const userIdAuth = ctx.state.user.id;
    const files = ctx.request.files.avatar;

    const uploadFile = await strapi.plugins.upload.services.upload.upload({
      data: {},
      files,
    });

    const data = await strapi.db.query("plugin::users-permissions.user").update({
      where: { id: userIdAuth },
      data: { avatar: uploadFile[0].id },
      select: ["id", "username"],
      populate: {
        avatar: {
          select: ["url"],
        },
      },
    });

    return data;
  },

  async dataPublicUpdate(ctx) {
    const userIdAuth = ctx.state.user.id;
    const { username, about, website, youtube, instagram, tiktok, github, city, country } = ctx.request.body;

    let data = {};

    if (!!username) data.username = username;
    if (!!about) data.about = about;
    if (!!website) data.website = website;
    if (!!youtube) data.youtube = youtube;
    if (!!instagram) data.instagram = instagram;
    if (!!tiktok) data.tiktok = tiktok;
    if (!!github) data.github = github;
    if (!!city) data.city = city;
    if (!!country) data.country = country;

    const update = await strapi.db.query("plugin::users-permissions.user").update({
      data,
      where: { id: userIdAuth },
      select: ["id", "username", "blocked", "views", "createdAt", "updatedAt", "about", "website", "youtube", "instagram", "tiktok", "github", "city", "country"],
    });

    return { data: update };
  },

  async dataEmailUpdate(ctx) {
    const data = await strapi.db.query("plugin::users-permissions.user").update({
      where: { id: ctx.state.user.id },
      data: { email: ctx.request.body.email },
      select: ["id", "username", "email"],
    });

    return { data };
  },

  async dataPasswordUpdate(ctx) {
    const password = bcrypt.hashSync(ctx.request.body.password, 10);

    const data = await strapi.db.query("plugin::users-permissions.user").update({
      where: { id: ctx.state.user.id },
      data: { password },
      select: ["id", "username", "password"],
    });

    return { data };
  },

  async dataUserDelete(ctx) {
    const data = await strapi.db.query("plugin::users-permissions.user").delete({
      where: { id: ctx.state.user.id },
      select: ["id", "username"],
    });

    return { data };
  },
};
