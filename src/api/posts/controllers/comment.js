"use strict";

/**
 * articles comments router.
 */

module.exports = {
  async find(ctx, next) {
    if (parseInt(ctx.request.params.page) <= 0 || parseInt(ctx.request.params.id) <= 0)
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message: `Field is a required field`,
          details: {
            errors: [
              {
                path: [`page: ${ctx.request.params.page}`, `articleId: ${ctx.request.params.id}`],
                message: `Field is a required field`,
                name: "ValidationError",
              },
            ],
          },
        },
      });

    const commentQuantity = await strapi.db.query("api::comments.comments").count({
      where: {
        article: {
          id: ctx.request.params.id,
        },
      },
    });

    const commentList = await strapi.db.query("api::comments.comments").findMany({
      where: {
        article: { id: ctx.request.params.id },
      },
      limit: 10,
      sort: { createdAt: "desc" },
      offset: ctx.request.params.page - 1 === 0 ? 0 : (ctx.request.params.page - 1) * 10,
      populate: {
        author: {
          select: ["username"],
          populate: {
            avatar: {
              select: ["url"],
            },
          },
        },
      },
    });

    ctx.body = {
      data: commentList,
      meta: {
        pagination: {
          page: parseInt(ctx.request.params.page),
          total: commentQuantity,
          pageSize: 10,
          pageCount: Math.ceil(commentQuantity / 10),
        },
      },
    };
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
