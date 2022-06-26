"use strict";

/**
 * users service.
 */

module.exports = ({ strapi }) => ({
  async find(query, page) {
    if (typeof page === "number" && !page) {
      return {
        data: null,
        error: {
          status: 400,
          name: "Wrong field page",
          message: "You must add page in url",
          details: {},
        },
      };
    }

    let data = {
      tags: { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 10, pageCount: 1 } } },
      posts: { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 10, pageCount: 1 } } },
      users: { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 10, pageCount: 1 } } },
    };

    data.tags.meta.pagination.total = await strapi.db.query("api::tags.tags").count({ where: { title: { $containsi: query } } });
    data.posts.meta.pagination.total = await strapi.db.query("api::posts.posts").count({ where: { title: { $containsi: query } } });
    data.users.meta.pagination.total = await strapi.db.query("plugin::users-permissions.user").count({ where: { username: { $containsi: query } } });

    if (!!page) {
      data.tags.meta.pagination.page = page;
      data.posts.meta.pagination.page = page;
      data.users.meta.pagination.page = page;
    }

    data.tags.meta.pagination.pageCount = Math.ceil(data.tags.meta.pagination.total / data.tags.meta.pagination.pageSize);
    data.posts.meta.pagination.pageCount = Math.ceil(data.posts.meta.pagination.total / data.posts.meta.pagination.pageSize);
    data.users.meta.pagination.pageCount = Math.ceil(data.users.meta.pagination.total / data.users.meta.pagination.pageSize);

    const tags = await strapi.entityService.findMany("api::tags.tags", {
      filters: { title: { $containsi: query } },
      populate: ["cover"],
      sort: { views: "desc" },
      start: (data.posts.meta.pagination.page - 1) * 10,
      limit: 10,
    });

    const posts = await strapi.entityService.findMany("api::posts.posts", {
      filters: { title: { $containsi: query } },
      populate: ["cover", "tags"],
      sort: { createdAt: "desc" },
      start: (data.posts.meta.pagination.page - 1) * 10,
      limit: 10,
    });

    const users = await strapi.entityService.findMany("plugin::users-permissions.user", {
      filters: { username: { $containsi: query } },
      populate: ["avatar", "skilks"],
      sort: { views: "desc" },
      start: (data.posts.meta.pagination.page - 1) * 10,
      limit: 10,
    });

    data.posts.data = posts.map((post) => {
      return {
        id: post?.id,
        attributes: {
          ...post,
          cover: { data: { id: post?.cover?.id, attributes: { ...post?.cover } } },
          tags: {
            data: post?.tags?.length
              ? post?.tags?.map((tag) => {
                  return { id: tag?.id, attributes: { ...tag } };
                })
              : [],
          },
        },
      };
    });

    data.tags.data = tags.map((tag) => {
      return {
        id: tag?.id,
        attributes: {
          ...tag,
          cover: { data: { id: tag?.cover?.id, attributes: { ...tag?.cover } } },
        },
      };
    });

    data.users.data = users.map((user) => {
      return {
        id: user.id,
        attributes: {
          ...user,
          avatar: { data: { id: user?.avatar?.id, attributes: { ...user?.avatar } } },
        },
      };
    });

    return { data };
  },
});
