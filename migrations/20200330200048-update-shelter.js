module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('shelters', 'latitude', { allowNull: false, type: Sequelize.FLOAT }),
    queryInterface.addColumn('shelters', 'longitude', { allowNull: false, type: Sequelize.FLOAT }),
    queryInterface.addColumn('shelters', 'street', { allowNull: false, type: Sequelize.STRING }),
    queryInterface.addColumn('shelters', 'street_number', { allowNull: false, type: Sequelize.STRING }),
    queryInterface.addColumn('shelters', 'city', { allowNull: false, type: Sequelize.STRING }),
    queryInterface.addColumn('shelters', 'state', { allowNull: false, type: Sequelize.STRING }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('shelters', 'latitude'),
    queryInterface.removeColumn('shelters', 'longitude'),
    queryInterface.removeColumn('shelters', 'street'),
    queryInterface.removeColumn('shelters', 'street_number'),
    queryInterface.removeColumn('shelters', 'city'),
    queryInterface.removeColumn('shelters', 'state'),
  ]),
};
