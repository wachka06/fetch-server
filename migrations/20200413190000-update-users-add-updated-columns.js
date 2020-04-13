module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'pet_size_preference', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
      queryInterface.addColumn('users', 'pet_sex_preference', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
      queryInterface.addColumn('users', 'pet_type_preference', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
      queryInterface.addColumn('users', 'pet_age_preference', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
      queryInterface.addColumn('users', 'pet_activity_preference', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
      queryInterface.addColumn('users', 'pet_dependency_preference', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
      queryInterface.addColumn('users', 'pet_social_preference', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
      queryInterface.addColumn('users', 'pet_trainability_preference', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'pet_size_preference'),
      queryInterface.removeColumn('users', 'pet_sex_preference'),
      queryInterface.removeColumn('users', 'pet_type_preference'),
      queryInterface.removeColumn('users', 'pet_age_preference'),
      queryInterface.removeColumn('users', 'pet_activity_preference'),
      queryInterface.removeColumn('users', 'pet_dependency_preference'),
      queryInterface.removeColumn('users', 'pet_social_preference'),
      queryInterface.removeColumn('users', 'pet_trainability_preference'),
    ]);
  },
};
