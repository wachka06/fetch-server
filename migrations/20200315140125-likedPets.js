'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Liked_Pets', {
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
      // userId: {
      //   allowNull: false,
      //   type: Sequelize.UUID,
      //   references: {
      //     model: 'Users',
      //     key: 'id'
      //   },
      //   onDelete: 'CASCADE'
      // },
      // petId: {
      //   allowNull: false,
      //   type: Sequelize.UUID,
      //   references: {
      //     model: 'Pets',
      //     key: 'id'
      //   },
      //   onDelete: 'CASCADE'
      // },
      likedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Liked_Pets');
  }
};