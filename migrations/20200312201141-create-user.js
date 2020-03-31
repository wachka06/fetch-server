const PetPreferences = require('../sharedConstants/petPreferenceEnumsV1');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.JSONB,
    },
    pet_age_preference: {
      type: Sequelize.ENUM(PetPreferences.AGE),
    },
    pet_distance_preference: {
      type: Sequelize.INTEGER,
    },
    pet_size_preference: {
      type: Sequelize.ENUM(PetPreferences.SIZE),
    },
    pet_type_preference: {
      type: Sequelize.ENUM(PetPreferences.TYPE),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
