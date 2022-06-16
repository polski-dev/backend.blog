"use strict";

/**
 * articles comments router.
 */

module.exports = {
  async add(ctx, next) {
    const isGradeTypeTrue = ctx.request.body.grade === "wrr" || ctx.request.body.grade === "best" || ctx.request.body.grade === "wow";

    const grade = await strapi.db.query("api::ratings.ratings").findOne({
      where: {
        article: { id: ctx.request.params.id },
        author: { id: ctx.state.user.id },
      },
    });

    if (isGradeTypeTrue && !grade) {
      const gradeAdd = await strapi.db.query("api::ratings.ratings").create({
        data: {
          voice: ctx.request.body.grade,
          article: { id: ctx.request.params.id },
          author: { id: ctx.state.user.id },
        },
      });
      ctx.body = { data: { voice: gradeAdd.voice, update: true } };
    } else {
      ctx.body = { data: { voice: grade.voice, update: false } };
    }
  },
};
