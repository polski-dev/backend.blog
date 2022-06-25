"use strict";

/**
 * searchs router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/searchs/:query",
      handler: "searchs.find",
      config: {
        auth: false,
      },
    },
  ],
};
