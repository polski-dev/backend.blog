"use strict";

/**
 * users service.
 */

module.exports = ({ strapi }) => ({
  async find(query) {
    console.log(query);
    return { ok: "ok" };
  },
});
