module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('users', 'latitude', { allowNull: false, type: Sequelize.FLOAT }),
    queryInterface.addColumn('users', 'longitude', { allowNull: false, type: Sequelize.FLOAT }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('users', 'latitude'),
    queryInterface.removeColumn('users', 'longitude'),
  ]),
};
