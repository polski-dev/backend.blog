"use strict";

/**
 * users router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/users/count/:id",
      handler: "users.count",
      config: {
        auth: false,
      },
    },
    {
      method: "PUT",
      path: "/users/views/:id",
      handler: "users.addViews",
      config: {
        auth: false,
      },
    },
  ],
};
