module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([ 
        queryInterface.addColumn('users', 'zipcode', { allowNull: false, type: Sequelize.STRING }),
        queryInterface.removeColumn('users', 'location')
  ])
},
  down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('users', 'zipcode'),
        queryInterface.addColumn('users', 'location', { type: Sequelize.JSONB })
      ])
  }
};
