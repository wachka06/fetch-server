module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('liked_pets', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: true,
        type: Sequelize.UUID,
      },
      likedAt: {
        type: Sequelize.DATE
      },
      pet_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'pets',
          key: 'id'
        }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('liked_pets');
  }
};