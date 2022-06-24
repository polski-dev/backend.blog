"use strict";

/**
 * posts router.
 */

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/tag/views/:id",
      handler: "tags.addViews",
      config: {
        auth: false,
      },
    },
  ],
};
