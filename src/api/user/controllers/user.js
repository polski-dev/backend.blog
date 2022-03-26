"use strict";

/**
 * users  router.
 */

module.exports = {
  async statistics(ctx, next) {
    const userId = parseInt(ctx.request.params.id);

    const views = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: {
        id: userId,
      },
      select: ["views"],
    });

    const followingmes = await strapi.db.query("plugin::users-permissions.user").count({
      where: {
        followusers: { id: userId },
      },
    });

    const followuser = await strapi.db.query("plugin::users-permissions.user").count({
      where: {
        id: userId,
        followusers: {},
      },
    });

    const comments = await strapi.db.query("api::comments.comments").count({
      where: {
        author: { id: userId },
      },
    });

    const followTags = await strapi.db.query("api::tags.tags").count({
      where: {
        users: { id: userId },
      },
    });

    const addGrade = await strapi.db.query("api::grade.grade").count({
      where: {
        author: { id: userId },
      },
    });

    const addVideo = await strapi.db.query("api::articles.articles").count({
      where: {
        author: { id: userId },
      },
    });

    const addArticle = await strapi.db.query("api::video.video").count({
      where: {
        author: { id: userId },
      },
    });

    ctx.body = {
      views: views.views,
      followingmes,
      followuser,
      comments,
      followTags,
      addGrade,
      addPosts: addVideo + addArticle,
    };
  },

  async status(ctx, next) {
    const userId = parseInt(ctx.request.params.id);
    const userIdAuth = ctx.state.user.id;

    if (!userId || !userIdAuth) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message: `Field is a required field`,
          details: {
            errors: [
              {
                path: [`userId: ${userIdAuth}`, `userIdAuth: ${userIdAuth}`],
                message: `Field is a required field`,
                name: "ValidationError",
              },
            ],
          },
        },
      });
    }

    const subscriptionStatus = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: {
        id: userId,
        followingmes: {
          id: userIdAuth,
        },
      },
      select: ["id", "username"],
    });

    ctx.body = {
      data: {
        status: !!subscriptionStatus,
      },
    };
  },

  async toggle(ctx, next) {
    const userId = parseInt(ctx.request.params.id);
    const userIdAuth = ctx.state.user.id;

    if (!userId || !userIdAuth) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`userId: ${userId}`, `userIdAuth: ${userIdAuth}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      });
    }

    const subscriptions = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: {
        id: userId,
      },
      select: ["id"],
      populate: { followingmes: { select: ["id", "username"] } },
    });

    const subscriptionsNew = subscriptions.followingmes.filter((sub) => sub.id != userIdAuth);

    let answer;

    if (subscriptionsNew.length === subscriptions.followingmes.length)
      answer = await strapi.db.query("plugin::users-permissions.user").update({
        where: {
          id: userId,
        },
        select: ["id", "username"],

        data: {
          followingmes: [...subscriptions.followingmes, { id: userIdAuth }],
        },
      });
    else
      answer = await strapi.db.query("plugin::users-permissions.user").update({
        where: {
          id: userId,
        },
        select: ["id", "username"],
        data: {
          followingmes: subscriptionsNew,
        },
      });

    if (!!answer?.id) return (ctx.body = { data: { update: true, ...answer } });
    else
      ctx.body = {
        data: { update: false, id: null, username: null },
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`id: ${answer.id}`, `username: ${answer.username}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      };
  },
};
