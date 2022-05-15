"use strict";

/**
 *  articles controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::articles.articles", ({ strapi }) => ({
  async create(ctx) {
    const userId = ctx.state.user.id;
    const file = ctx.request.files.cover;
    const typeCover = ctx?.request?.files?.cover?.type;
    const { title, content, type, youtube, tags } = ctx.request.body;

    const tagasInArray = tags.split(",");

    if (!userId)
      return (ctx.body = {
        data: null,
        error: {
          status: 403,
          name: "ForbiddenError",
          message: "Forbidden",
          details: {},
        },
      });
    else if (!file || !title || !content || !type || !tags)
      ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message: `Field is a required field`,
          details: {
            errors: [
              {
                path: [`file: ${!!file}`, `title: ${!!title}`, `content: ${!!content}`, `type: ${!!type}`, `tags: ${!!tags}`],
                message: `Field is a required field`,
                name: "ValidationError",
              },
            ],
          },
        },
      };
    else if (type === "video" && !youtube)
      ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message: `Field is a required field`,
          details: {
            errors: [
              {
                path: [`file: ${!!file}`, `title: ${!!title}`, `content: ${!!content}`, `type: ${!!type}`, `youtube: ${!!youtube}`],
                message: `Field is a required field`,
                name: "ValidationError",
              },
            ],
          },
        },
      };

    if (ctx.is("multipart/form-data") && (typeCover === "image/png" || typeCover === "image/jpg" || typeCover === "image/jpeg")) {
      let allTitleTags = [];
      tagasInArray.forEach((tag) => allTitleTags.push({ title: tag }));

      const tagInDB = await strapi.db.query("api::tags.tags").findMany({
        where: {
          $or: allTitleTags,
        },
      });

      let allIdTags = [];

      allTitleTags.forEach(async (tag) => {
        const search = tagInDB.filter((data) => data.title === tag.title);

        if (!!search[0]) allIdTags.push(search[0]);
        else {
          const newTag = await strapi.db.query("api::tags.tags").create({ data: { title: tag.title } });
          allIdTags.push(newTag);
        }
      });

      const uploadFile = await strapi.plugins.upload.services.upload.upload({
        data: {},
        files: file,
      });

      const data = await strapi.db.query("api::articles.articles").create({
        data: { title, author: userId, waitingroom: true, views: 0, cover: uploadFile[0].id, content, type, tags: allIdTags, youtube: youtube ? youtube : "" },
      });

      return (ctx.body = { data: data });
    }

    return (ctx.body = {
      data: null,
      error: {
        status: 400,
        name: "AppError",
        message: `files fild empty`,
        details: {
          errors: [
            {
              path: [`files: fild empty`],
              message: `files fild empty`,
              name: "AppError",
            },
          ],
        },
      },
    });
  },
}));
