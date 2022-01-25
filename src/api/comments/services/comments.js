'use strict';

/**
 * comments service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::comments.comments');
