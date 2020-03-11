module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Users', {
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
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            unique: true,
            type: Sequelize.DataTypes.UUID,
          },
          first_name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          last_name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          location: {
            type: Sequelize.JSONB,
          },
          pet_type_preference: {
            type: Sequelize.ENUM('dog', 'cat', 'no preference'),
          },
          pet_size_preference: {
            type: Sequelize.ENUM('small', 'medium', 'large'),
          },
          pet_age_preference: {
            type: Sequelize.STRING,
          },
          pet_distance_preference: {
            type: Sequelize.STRING,
          },
          pet_preference_one: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          pet_preference_two: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          pet_preference_three: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          pet_preference_four: {
            type: Sequelize.INTEGER,
            allowNull: false
          }
      })
    })
  },

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
