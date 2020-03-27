'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameColumn('liked_pets', 'likedAt', 'liked_at');
  },

  down: (queryInterface) => {
    return queryInterface.renameColumn('liked_pets', 'liked_at', 'likedAt');
  }
};
