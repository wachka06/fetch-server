const PetPreferences = require('../sharedConstants/petPreferenceEnums');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      defaultValue: UUID.v4(),
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: DataTypes.JSONB,
    pet_age_preference: DataTypes.STRING,
    pet_distance_preference: DataTypes.STRING,
    pet_size_preference: {
      type: DataTypes.ENUM({
        values: ['small', 'medium', 'large']
      })
    },
    pet_type_preference: {
      type: DataTypes.ENUM({
        values: ['dog', 'cat', 'no preference']
      })
    },
    // NOTE: These fields will define preferences that will correspond with pet preference values for our match test.
    pet_preference_one: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    pet_preference_two: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    pet_preference_three: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    pet_preference_four: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    //--- end preference fields
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Pets, { through: models.LikedPets });
    User.hasMany(models.LikedPets, { onDelete: 'CASCADE' } )
  };
  return User;
};
