"use strict";

/**
 * tag subscribe controler.
 */

module.exports = {
  async statistics(ctx, next) {
    const tagId = parseInt(ctx.request.params.id);

    if (!parseInt(tagId)) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message: `Field is a required field`,
          details: {
            errors: [
              {
                path: [`tagId: ${tagId}`, `userIdAuth: ${userIdAuth}`],
                message: `Field is a required field`,
                name: "ValidationError",
              },
            ],
          },
        },
      });
    }

    const followuser = await strapi.db.query("api::tags.tags").count({
      where: {
        id: tagId,
        users: {},
      },
    });

    const addVideo = await strapi.db.query("api::posts.posts").count({
      where: {
        id: tagId,
        video: {},
      },
    });

    const addArticle = await strapi.db.query("api::video.video").count({
      where: {
        id: tagId,
        articles: {},
      },
    });

    ctx.body = {
      data: {
        followuser,
        addVideo,
        addArticle,
      },
    };
  },

  async status(ctx, next) {
    const tagId = parseInt(ctx.request.params.id);
    const userIdAuth = ctx.state.user.id;

    if (!tagId || !userIdAuth) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message: `Field is a required field`,
          details: {
            errors: [
              {
                path: [`tagId: ${tagId}`, `userIdAuth: ${userIdAuth}`],
                message: `Field is a required field`,
                name: "ValidationError",
              },
            ],
          },
        },
      });
    }

    const subscriptionStatus = await strapi.db.query("api::tags.tags").findOne({
      where: {
        id: tagId,
        users: {
          id: userIdAuth,
        },
      },
      select: ["id", "title"],
    });

    ctx.body = {
      data: {
        status: !!subscriptionStatus,
      },
    };
  },

  async toggle(ctx, next) {
    const tagId = parseInt(ctx.request.params.id);
    const userIdAuth = ctx.state.user.id;

    if (!tagId || !userIdAuth) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`tagId: ${tagId}`, `userIdAuth: ${userIdAuth}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      });
    }

    const subscriptions = await strapi.db.query("api::tags.tags").findOne({
      where: {
        id: tagId,
      },
      select: ["id"],
      populate: { users: { select: ["id"] } },
    });

    const subscriptionsNew = subscriptions.users.filter((sub) => sub.id != userIdAuth);

    let answer;

    if (subscriptionsNew.length === subscriptions.users.length)
      answer = await strapi.db.query("api::tags.tags").update({
        where: {
          id: tagId,
        },
        select: ["id", "title"],

        data: {
          users: [...subscriptions.users, { id: userIdAuth }],
        },
      });
    else
      answer = await strapi.db.query("api::tags.tags").update({
        where: {
          id: tagId,
        },
        select: ["id", "title"],
        data: {
          users: subscriptionsNew,
        },
      });

    if (!!answer?.id) return (ctx.body = { data: { update: true, ...answer } });
    else
      ctx.body = {
        data: { update: false, id: null, title: null },
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`id: ${answer.id}`, `title: ${answer.title}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      };
  },
};
