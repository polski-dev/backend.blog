"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/article/:id/grade",
      handler: "grade.add",
    },
  ],
};
