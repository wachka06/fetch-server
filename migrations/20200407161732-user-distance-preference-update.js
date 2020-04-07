'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.changeColumn('users', 'pet_distance_preference', 
    {
      allowNull: false,
      defaultValue: 20,
      type: Sequelize.INTEGER,
    }),

    down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('users', 'pet_distance_preference', 
    {
      type: Sequelize.INTEGER
    })    
};
