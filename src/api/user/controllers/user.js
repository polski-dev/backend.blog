"use strict";
const bcrypt = require("bcryptjs");

/**
 * users  router.
 */

module.exports = {
  async statistics(ctx, next) {
    const userId = parseInt(ctx.request.params.id);

    if (!parseInt(userId)) {
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
      data: {
        views: views.views,
        followingmes,
        followuser,
        comments,
        followTags,
        addGrade,
        addPosts: addVideo + addArticle,
      },
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

  async himselfdata(ctx, next) {
    const userIdAuth = ctx.state.user.id;

    if (!userIdAuth) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`userIdAuth: ${userIdAuth}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      });
    }
    const data = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: { id: userIdAuth },
      populate: {
        avatar: {
          select: ["url"],
        },
      },
      select: [
        "id",
        "username",
        "email",
        "blocked",
        "views",
        "createdAt",
        "updatedAt",
        "about",
        "website",
        "youtube",
        "instagram",
        "tiktok",
        "github",
        "city",
        "country",
      ],
    });

    ctx.body = data;
  },

  async himselfDataPublicUpdate(ctx, next) {
    const userIdAuth = ctx.state.user.id;
    const { username, about, website, youtube, instagram, tiktok, github, city, country } = ctx.request.body;
    console.log(ctx.state.user);
    if (!userIdAuth) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`userIdAuth: ${userIdAuth}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      });
    }
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
      where: { id: userIdAuth },
      data,
    });

    ctx.body = update;
  },

  async himselfDataEmailUpdate(ctx, next) {
    const userIdAuth = ctx.state.user.id;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { email } = ctx.request.body;

    if (!userIdAuth || !emailRegex.test(email)) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`userIdAuth: ${userIdAuth}`, `email: ${email}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      });
    }

    const isEmailUnique = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: { email },
    });

    if (!!isEmailUnique) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "AppError email is uses",
          message: `Field update`,
          details: {
            errors: [
              {
                path: [`Email is uses: ${email}`],
                message: `Field update`,
                name: "AppError email is uses",
              },
            ],
          },
        },
      });
    }

    const data = await strapi.db.query("plugin::users-permissions.user").update({
      where: { id: userIdAuth },
      data: { email },
      select: ["id", "email"],
    });

    ctx.body = data;
  },

  async himselfDataPasswordUpdate(ctx, next) {
    const userIdAuth = ctx.state.user.id;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

    const { password } = ctx.request.body;

    if (!userIdAuth || !passwordRegex.test(password)) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`userIdAuth: ${userIdAuth}`, `password: ${password}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      });
    }

    const passwordNew = bcrypt.hashSync(password, 10);

    const data = await strapi.db.query("plugin::users-permissions.user").update({
      where: { id: userIdAuth },
      data: { password: passwordNew },
      select: ["id", "password"],
    });

    ctx.body = data;
  },

  async himselfDataPasswordDelete(ctx, next) {
    const userIdAuth = ctx.state.user.id;

    if (!userIdAuth || !passwordRegex.test(password)) {
      return (ctx.body = {
        data: null,
        error: {
          status: 400,
          name: "AppError",
          message: `Field app`,
          details: {
            errors: [
              {
                path: [`userIdAuth: ${userIdAuth}`, `password: ${password}`],
                message: `Field app`,
                name: "AppError",
              },
            ],
          },
        },
      });
    }

    const passwordNew = bcrypt.hashSync(password, 10);

    const data = await strapi.db.query("plugin::users-permissions.user").update({
      where: { id: userIdAuth },
      data: { password: passwordNew },
      select: ["id", "password"],
    });

    ctx.body = data;
  },
};
