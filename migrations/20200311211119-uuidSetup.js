'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
    ),
  down: () => Promise.resolve(),
};