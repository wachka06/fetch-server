const PetPreferences = require('../sharedConstants/petPreferenceEnumsV1');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('pets', 'status', { type: Sequelize.ENUM(PetPreferences.STATUS), allowNull: false }),
      queryInterface.addColumn('pets', 'pet_dependency_value', Sequelize.ENUM(PetPreferences.DEPENDENCY)),
      queryInterface.addColumn('pets', 'pet_activity_value', Sequelize.ENUM(PetPreferences.ACTIVITY)),
      queryInterface.addColumn('pets', 'pet_social_value', Sequelize.ENUM(PetPreferences.SOCIAL)),
      queryInterface.addColumn('pets', 'pet_trainability_value', Sequelize.ENUM(PetPreferences.TRAINABILITY)),
      queryInterface.addColumn('pets', 'recommended_experience_level', Sequelize.ENUM(PetPreferences.EXPERIENCE)),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('pets', 'status', { type: Sequelize.STRING, allowNull: false }),
      queryInterface.removeColumn('pets', 'pet_dependency_value', Sequelize.ENUM(PetPreferences.DEPENDENCY)),
      queryInterface.removeColumn('pets', 'pet_activity_value', Sequelize.ENUM(PetPreferences.ACTIVITY)),
      queryInterface.removeColumn('pets', 'pet_social_value', Sequelize.ENUM(PetPreferences.SOCIAL)),
      queryInterface.removeColumn('pets', 'pet_trainability_value', Sequelize.ENUM(PetPreferences.TRAINABILITY)),
      queryInterface.removeColumn('pets', 'recommended_experience_level', Sequelize.ENUM(PetPreferences.EXPERIENCE)),
    ]);
  },
};
