"use strict";

/**
 * articles router.
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/videos/:id/grade",
      handler: "grade.add",
    },
  ],
};
