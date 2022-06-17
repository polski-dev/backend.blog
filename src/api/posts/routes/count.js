"use strict";

/**
 * posts router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/post/count",
      handler: "posts.count",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/post/count/:id",
      handler: "posts.count",
      config: {
        auth: false,
      },
    },
  ],
};
