"use strict";

/**
 * raitings router.
 */

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/rating",
      handler: "ratings.addOrChange",
    },
    {
      method: "DELETE",
      path: "/rating/delete",
      handler: "ratings.deleteRaitingUser",
    },
  ],
};
