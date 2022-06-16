"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts/:id/comment/:page",
      handler: "comment.find",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/posts/:id/comment",
      handler: "comment.add",
    },
  ],
};
