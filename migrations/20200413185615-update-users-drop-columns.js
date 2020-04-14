const petPreferenceEnumsV2 = require('./../sharedConstants/petPreferenceEnumsV2');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'pet_size_preference'),
      queryInterface.removeColumn('users', 'pet_sex_preference'),
      queryInterface.removeColumn('users', 'pet_type_preference'),
      queryInterface.removeColumn('users', 'pet_age_preference'),
      queryInterface.removeColumn('users', 'pet_activity_preference'),
      queryInterface.removeColumn('users', 'pet_dependency_preference'),
      queryInterface.removeColumn('users', 'pet_social_preference'),
      queryInterface.removeColumn('users', 'pet_trainability_preference'),
      queryInterface.sequelize.query(
        'DROP TYPE "enum_users_pet_size_preference";'
      ),
      queryInterface.sequelize.query(
        'DROP TYPE "enum_users_pet_sex_preference";'
      ),
      queryInterface.sequelize.query(
        'DROP TYPE "enum_users_pet_type_preference";'
      ),
      queryInterface.sequelize.query(
        'DROP TYPE "enum_users_pet_age_preference";'
      ),
      queryInterface.sequelize.query(
        'DROP TYPE "enum_users_pet_activity_preference";'
      ),
      queryInterface.sequelize.query(
        'DROP TYPE "enum_users_pet_dependencey_preference";'
      ),
      queryInterface.sequelize.query(
        'DROP TYPE "enum_users_pet_social_preference";'
      ),
      queryInterface.sequelize.query(
        'DROP TYPE "enum_users_pet_trainability_preference";'
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'pet_size_preference', {
        type: Sequelize.ENUM(petPreferenceEnumsV2.PET_SIZE),
      }),
      queryInterface.addColumn('users', 'pet_sex_preference', {
        type: Sequelize.ENUM(petPreferenceEnumsV2.PET_SEX),
      }),
      queryInterface.addColumn('users', 'pet_age_preference', {
        type: Sequelize.ENUM(petPreferenceEnumsV2.PET_AGE),
      }),
      queryInterface.addColumn('users', 'pet_type_preference', {
        type: Sequelize.ENUM(petPreferenceEnumsV2.PET_TYPE),
      }),
      queryInterface.addColumn('users', 'pet_activity_preference', {
        type: Sequelize.ENUM(petPreferenceEnumsV2.PET_ACTIVITY),
      }),
      queryInterface.addColumn('users', 'pet_dependencey_preference', {
        type: Sequelize.ENUM(petPreferenceEnumsV2.PET_DEPENDENCY),
      }),
      queryInterface.addColumn('users', 'pet_social_preference', {
        type: Sequelize.ENUM(petPreferenceEnumsV2.PET_SOCIABILITY),
      }),
      queryInterface.addColumn('users', 'pet_trainability_preference', {
        type: Sequelize.ENUM(petPreferenceEnumsV2.PET_TRAINABILITY),
      }),
      queryInterface.renameColumn(
        'users',
        'pet_dependencey_preference',
        'pet_dependency_preference'
      ),
    ]);
  },
};
