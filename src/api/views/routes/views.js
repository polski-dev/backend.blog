"use strict";

/**
 * count router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/views/article/:id",
      handler: "views.viewsArticle",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/views/video/:id",
      handler: "views.viewsVideo",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/views/user/:id",
      handler: "views.viewsUser",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/views/tag/:id",
      handler: "views.viewsTag",
      config: {
        auth: false,
      },
    },
  ],
};
