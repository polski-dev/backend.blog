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
  ],
};
