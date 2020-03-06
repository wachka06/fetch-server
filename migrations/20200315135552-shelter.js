'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shelters', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: true,
        type: Sequelize.UUID,
      },
      location: {
        allowNull: false,
        type: Sequelize.JSONB,
      },
      name: {
        type: Sequelize.STRING
      },
      hours: {
        type: Sequelize.JSONB
      },
      phone: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      organization_id: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Shelters');
  }
};