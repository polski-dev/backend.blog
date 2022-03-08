"use strict";

/**
 * articles comments router.
 */

module.exports = {
  async find(ctx, next) {
    ctx.body = await strapi.db.query("api::comments.comments").findMany({
      where: {
        article: { id: ctx.params.id },
      },
      populate: {
        grade: true,
      },
    });
  },

  async add(ctx, next) {
    const description = ctx.request.body.description;
    const articleId = ctx.request.params.id;
    const userId = ctx.state.user.id;

    if (!!description && !!articleId && !!userId) {
      const addComment = await strapi.db.query("api::comments.comments").create({
        data: {
          description: ctx.request.body.description,
          article: { id: ctx.request.params.id },
          author: { id: ctx.state.user.id },
        },
      });

      ctx.body = {
        data: {
          add: true,
          id: addComment.id,
          createdAt: addComment.createdAt,
          description: addComment.description,
        },
      };
    } else {
      ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message: `Field is a required field`,
          details: {
            errors: [
              {
                path: [`description: ${description}`, `articleId: ${articleId}`, `userId: ${userId}`],
                message: `Field is a required field`,
                name: "ValidationError",
              },
            ],
          },
        },
      };
    }
  },
};
