"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/posts/:id/grade",
      handler: "grade.add",
    },
  ],
};
