"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/videos/:id/comment/:page",
      handler: "comment.find",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/videos/:id/comment",
      handler: "comment.add",
    },
  ],
};
