'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pets', {
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
        primaryKey: true,
        allowNull: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: true,
        type: Sequelize.UUID,
      },
      age: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coat: {
        type: Sequelize.STRING
      },
      declawed: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.STRING
      },
      good_with_children: {
        type: Sequelize.BOOLEAN
      },
      good_with_dogs: {
        type: Sequelize.BOOLEAN
      },
      good_with_cats: {
        type: Sequelize.BOOLEAN
      },
      house_trained: {
        type: Sequelize.BOOLEAN
      },
      is_mixed_breed: {
        type: Sequelize.BOOLEAN
      },
      is_unknown_breed: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      primary_breed: {
        type: Sequelize.STRING
      },
      primary_color: {
        allowNull: false,
        type: Sequelize.STRING
      },
      preference_one_value: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      preference_two_value: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      preference_three_value: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      preference_four_value: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      secondary_breed: {
        type: Sequelize.STRING
      },
      secondary_color: {
        type: Sequelize.STRING
      },
      sex: {
        allowNull: false,
        type: Sequelize.ENUM('male', 'female', 'unknown')
      },
      shots_are_current: {
        type: Sequelize.BOOLEAN
      },
      size: {
        allowNull: false,
        type: Sequelize.ENUM('small', 'medium','large')
      },
      spayed_or_neutered: {
        type: Sequelize.BOOLEAN
      },
      special_needs: {
        type: Sequelize.BOOLEAN
      },
      species_name: {
        type: Sequelize.ENUM('dog', 'cat')
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tertiary_color: {
        type: Sequelize.STRING
      },
      // shelterId: {
      //   allowNull: false,
      //   type: Sequelize.UUID,
      //   references: {
      //     model: 'Shelters',
      //     key: 'id'
      //   },
      //   onDelete: 'CASCADE'
      // }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pets');
  }
};