"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/user/:id/statistics",
      handler: "user.statistics",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/user/:id/subscribe",
      handler: "user.status",
    },
    {
      method: "POST",
      path: "/user/:id/subscribe/toggle",
      handler: "user.toggle",
    },
    {
      method: "POST",
      path: "/user/himself/data",
      handler: "user.himselfdata",
    },
    {
      method: "POST",
      path: "/user/himself/data/public",
      handler: "user.himselfDataPublicUpdate",
    },
    {
      method: "POST",
      path: "/user/himself/data/email",
      handler: "user.himselfDataEmailUpdate",
    },
    {
      method: "POST",
      path: "/user/himself/data/password",
      handler: "user.himselfDataPasswordUpdate",
    },
  ],
};
