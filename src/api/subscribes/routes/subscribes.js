"use strict";

/**
 * users router.
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
  ],
};
