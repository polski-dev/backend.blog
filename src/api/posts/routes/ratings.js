"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/posts/:id/ratings",
      handler: "ratings.add",
    },
  ],
};
