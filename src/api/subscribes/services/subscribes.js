"use strict";

/**
 * subscribes service.
 */

module.exports = ({ strapi }) => ({
  async amISubscribeUser(trustUserId, userIdAuth) {
    const status = await strapi.db.query("plugin::users-permissions.user").findMany({ where: { id: userIdAuth, followusers: { id: trustUserId } } });
    return { data: { subscribe: !!status.length } };
  },

  async changeUserSubscriptionStatus(trustUserId, userIdAuth) {
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

  async amISubscribeTag(trustTagId, userIdAuth) {
    const status = await strapi.db.query("api::tags.tags").findMany({ where: { id: trustTagId, users: { id: userIdAuth } } });
    return { data: { subscribe: !!status.length } };
  },

  async changeTagSubscriptionStatus(trustTagId, userIdAuth) {
    const status = !!(await strapi.db.query("api::tags.tags").findMany({ where: { id: trustTagId, users: { id: userIdAuth } } })).length;

    const subscriptions = await strapi.db.query("api::tags.tags").findOne({
      where: {
        id: trustTagId,
      },
      select: ["id"],
      populate: { users: { select: ["id"] } },
    });

    let newlistSubscribtion = [];

    if (status) newlistSubscribtion = subscriptions.users.filter((sub) => sub.id != userIdAuth);
    else newlistSubscribtion = [...subscriptions.users, userIdAuth];

    const res = await strapi.db.query("api::tags.tags").update({
      where: {
        id: trustTagId,
      },
      select: ["id", "title"],
      populate: { users: { select: ["id"] } },

      data: {
        users: newlistSubscribtion,
      },
    });

    return { data: res };
  },
});
