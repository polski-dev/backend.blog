"use strict";

/**
 * tag subscribe router.
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/tag/:id/statistics",
      handler: "subscribe.statistics",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/tag/:id/subscribe",
      handler: "subscribe.status",
    },
    {
      method: "POST",
      path: "/tag/:id/subscribe/toggle",
      handler: "subscribe.toggle",
    },
  ],
};
