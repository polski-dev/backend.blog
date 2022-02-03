"use strict";

/**
 * count router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/count/article/all/",
      handler: "count.allArticle",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/count/article/best/",
      handler: "count.bestArticle",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/count/article/waitingroom/",
      handler: "count.waitingRoomArticle",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/count/video/all/",
      handler: "count.allVideo",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/count/video/best/",
      handler: "count.bestVideo",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/count/video/waitingroom/",
      handler: "count.waitingRoomVideo",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/count/comment/all/",
      handler: "count.allComment",
      config: {
        auth: false,
      },
    },
  ],
};
