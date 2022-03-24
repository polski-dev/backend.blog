"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
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
