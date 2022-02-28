"use strict";

/**
 * count router.
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/views/article/:id",
      handler: "views.viewsArticle",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/views/video/:id",
      handler: "views.viewsVideo",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/views/user/:id",
      handler: "views.viewsUser",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/views/tag/:id",
      handler: "views.viewsTag",
      config: {
        auth: false,
      },
    },
  ],
};
