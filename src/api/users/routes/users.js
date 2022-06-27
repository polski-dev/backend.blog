"use strict";

/**
 * users router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/users/count/:id",
      handler: "users.count",
      config: {
        auth: false,
      },
    },
    {
      method: "PUT",
      path: "/users/views/:id",
      handler: "users.addViews",
      config: {
        auth: false,
      },
    },
    {
      method: "PUT",
      path: "/user/data/avatar",
      handler: "data.dataAvatarUpdate",
    },
    {
      method: "GET",
      path: "/user/data/public",
      handler: "data.dataPublicRead",
    },
    {
      method: "PUT",
      path: "/user/data/public",
      handler: "data.dataPublicUpdate",
    },
    {
      method: "GET",
      path: "/user/data/email",
      handler: "data.dataEmailRead",
    },
    {
      method: "PUT",
      path: "/user/data/email",
      handler: "data.dataEmailUpdate",
    },
    {
      method: "PUT",
      path: "/user/data/password",
      handler: "data.dataPasswordUpdate",
    },
    {
      method: "DELETE",
      path: "/user/data/delete",
      handler: "data.dataUserDelete",
    },
  ],
};
