const PetPreferences = require('../sharedConstants/petPreferenceEnums')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('users', 'pet_dependencey_preference', Sequelize.ENUM(PetPreferences.DEPENDENCY)),
      queryInterface.addColumn('users', 'pet_activity_preference', Sequelize.ENUM(PetPreferences.ACTIVITY)),
      queryInterface.addColumn('users', 'pet_trainability_preference', Sequelize.ENUM(PetPreferences.SOCIAL)),
      queryInterface.addColumn('users', 'pet_social_preference', Sequelize.ENUM(PetPreferences.TRAINABILITY)),
      queryInterface.addColumn('users', 'pet_sex_preference', Sequelize.ENUM(PetPreferences.SEX)),
      queryInterface.addColumn('users', 'pet_experience_level', Sequelize.ENUM(PetPreferences.EXPERIENCE)),
      queryInterface.addColumn('users', 'pet_good_with_children_preference', Sequelize.BOOLEAN),
      queryInterface.addColumn('users', 'pet_good_with_dogs_preference', Sequelize.BOOLEAN),
      queryInterface.addColumn('users', 'pet_good_with_cats_preference', Sequelize.BOOLEAN),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'pet_dependencey_preference', Sequelize.STRING),
      queryInterface.removeColumn('users', 'pet_activity_preference', Sequelize.ENUM(PetPreferences.ACTIVITY)),
      queryInterface.removeColumn('users', 'pet_trainability_preference', Sequelize.ENUM(PetPreferences.SOCIAL)),
      queryInterface.removeColumn('users', 'pet_social_preference', Sequelize.ENUM(PetPreferences.TRAINABILITY)),
      queryInterface.removeColumn('users', 'pet_sex_preference', Sequelize.ENUM(PetPreferences.SEX)),
      queryInterface.removeColumn('users', 'pet_experience_level', Sequelize.ENUM(PetPreferences.EXPERIENCE)),
      queryInterface.removeColumn('users', 'pet_good_with_children_preference', Sequelize.BOOLEAN),
      queryInterface.removeColumn('users', 'pet_good_with_dogs_preference', Sequelize.BOOLEAN),
      queryInterface.removeColumn('users', 'pet_good_with_cats_preference', Sequelize.BOOLEAN),
    ])
  }
};
