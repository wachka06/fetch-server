
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('pets', 'photos', { type: Sequelize.ARRAY(Sequelize.STRING) }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('pets', 'photos', { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false }),
};
