"use strict";

/**
 * articles comments router.
 */

module.exports = {
  async add(ctx, next) {
    const isGradeTypeTrue =
      ctx.request.body.grade === "wrr" || ctx.request.body.grade === "best" || ctx.request.body.grade === "wow";

    const grade = await strapi.db.query("api::grade.grade").findOne({
      where: {
        author: { id: ctx.state.user.id },
        video: { id: ctx.request.params.id },
      },
    });

    if (isGradeTypeTrue && !grade) {
      const gradeAdd = await strapi.db.query("api::grade.grade").create({
        data: {
          voice: ctx.request.body.grade,
          author: { id: ctx.state.user.id },
          video: { id: ctx.request.params.id },
        },
      });
      ctx.body = { data: { voice: gradeAdd.voice, update: true } };
    } else {
      ctx.body = { data: { voice: grade.voice, update: false } };
    }
  },
};
