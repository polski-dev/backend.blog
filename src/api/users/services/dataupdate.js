"use strict";

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

  async dataPublicUpdate() {
    return { ok: "dataPublicUpdate" };
  },

  async dataEmailUpdate() {
    return { ok: "dataEmailUpdate" };
  },

  async dataPasswordUpdate() {
    return { ok: "dataPasswordUpdate" };
  },

  async dataUserDelete() {
    return { ok: "dataUserDelete" };
  },
};
