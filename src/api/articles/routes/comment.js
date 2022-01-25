"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/article/:id/comment",
      handler: "comment.find",
      config: {
        auth: false,
      },
    },
  ],
};
