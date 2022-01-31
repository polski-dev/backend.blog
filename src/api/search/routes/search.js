"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/search/:id",
      handler: "search.find",
      config: {
        auth: false,
      },
    },
  ],
};
