"use strict";

/**
 * users  router.
 */

module.exports = {
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
      return (answer = await strapi.db.query("plugin::users-permissions.user").update({
        where: {
          id: userId,
        },
        select: ["id", "username"],
        data: {
          followingmes: [...subscriptions.followingmes, { id: userIdAuth }],
        },
      }));

    answer = await strapi.db.query("plugin::users-permissions.user").update({
      where: {
        id: userId,
      },
      select: ["id", "username"],
      data: {
        followingmes: subscriptionsNew,
      },
    });

    if (!!answer.id) return (ctx.body = { data: { ...answer, update: true } });

    ctx.body = {
      data: { ...answer, update: false, id: null, username: null },
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
