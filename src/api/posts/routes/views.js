"use strict";

/**
 * posts router.
 */

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/post/views/:id",
      handler: "posts.addViews",
      config: {
        auth: false,
      },
    },
  ],
};
