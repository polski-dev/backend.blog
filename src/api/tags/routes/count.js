"use strict";

/**
 * tag router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/tag/count",
      handler: "tags.count",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/tag/count/:id",
      handler: "tags.count",
      config: {
        auth: false,
      },
    },
  ],
};
