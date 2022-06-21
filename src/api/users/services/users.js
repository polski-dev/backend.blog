"use strict";

/**
 * users service.
 */

module.exports = ({ strapi }) => ({
  async count(id) {
    let data = {};
    const user = await strapi.db.query("plugin::users-permissions.user").findOne({ where: { id } });

    data.views = user.views;
    data.posts = await strapi.db.query("api::posts.posts").count({ where: { author: { id } } });
    data.followtags = await strapi.db.query("api::tags.tags").count({ where: { users: { id } } });
    data.commentsAdded = await strapi.db.query("plugin::comments.comment").count({ where: { authorId: id } });
    data.followusers = await strapi.db.query("plugin::users-permissions.user").count({ where: { followusers: { id } } });
    data.followingmes = await strapi.db.query("plugin::users-permissions.user").count({ where: { followingmes: { id } } });

    return { data };
  },

  async addViews(id) {
    const user = await strapi.db.query("plugin::users-permissions.user").findOne({ where: { id } });
    const userUpdated = await strapi.db.query("plugin::users-permissions.user").update({ where: { id }, data: { views: ++user.views } });

    return { data: { views: userUpdated?.views, id: userUpdated?.id } };
  },

  async amISubscribe(trustUserId, userIdAuth) {
    const status = await strapi.db.query("plugin::users-permissions.user").findMany({ where: { id: userIdAuth, followusers: { id: trustUserId } } });
    return { data: { subscribe: !!status.length } };
  },

  async changeSubscribe(trustUserId, userIdAuth) {
    const status = !!(await strapi.db.query("plugin::users-permissions.user").findMany({ where: { id: userIdAuth, followusers: { id: trustUserId } } })).length;

    const subscriptions = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: {
        id: userIdAuth,
      },
      select: ["id"],
      populate: { followusers: { select: ["id"] } },
    });

    let newlistSubscribtion = [];

    if (status) newlistSubscribtion = subscriptions.followusers.filter((sub) => sub.id != trustUserId);
    else newlistSubscribtion = [...subscriptions.followusers, trustUserId];

    const res = await strapi.db.query("plugin::users-permissions.user").update({
      where: {
        id: userIdAuth,
      },
      select: ["id", "username"],
      populate: { followusers: { select: ["id"] } },

      data: {
        followusers: newlistSubscribtion,
      },
    });

    return { data: res };
  },
});
