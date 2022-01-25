'use strict';

/**
 *  comments controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comments.comments');
