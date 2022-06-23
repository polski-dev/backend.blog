"use strict";

/**
 * subscribes router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/subscribes/users/:id",
      handler: "subscribes.amISubscribeUser",
    },
    {
      method: "PUT",
      path: "/subscribes/users/:id",
      handler: "subscribes.changeUserSubscriptionStatus",
    },
    {
      method: "GET",
      path: "/subscribes/tags/:id",
      handler: "subscribes.amISubscribeTag",
    },
    {
      method: "PUT",
      path: "/subscribes/tags/:id",
      handler: "subscribes.changeTagSubscriptionStatus",
    },
  ],
};
