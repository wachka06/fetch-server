'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameColumn(
      'users',
      'pet_dependencey_preference',
      'pet_dependency_preference'
    );
  },

  down: (queryInterface) => {
    return queryInterface.renameColumn(
      'users',
      'pet_dependency_preference',
      'pet_dependencey_preference'
    );
  },
};
