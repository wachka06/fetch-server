const PetPreferences = require('../sharedConstants/petPreferenceEnumsV2');
const { locationToCoordinates } = require('../utils/geocoding');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUIDV4,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.FLOAT,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
      zipcode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pet_size_preference: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      pet_age_preference: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      pet_type_preference: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      pet_distance_preference: {
        allowNull: false,
        defaultValue: 20,
        type: DataTypes.INTEGER,
        validate: {
          max: 30,
        },
      },
      pet_dependency_preference: DataTypes.ARRAY(DataTypes.STRING),
      pet_activity_preference: DataTypes.ARRAY(DataTypes.STRING),
      pet_trainability_preference: DataTypes.ARRAY(DataTypes.STRING),
      pet_social_preference: DataTypes.ARRAY(DataTypes.STRING),
      pet_sex_preference: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      pet_experience_level: {
        type: DataTypes.ENUM(PetPreferences.PET_EXPERIENCE_LEVEL),
      },
      pet_good_with_children_preference: DataTypes.BOOLEAN,
      pet_good_with_dogs_preference: DataTypes.BOOLEAN,
      pet_good_with_cats_preference: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: async (newUser) => {
          const { latitude, longitude } = await locationToCoordinates({
            zipcode: newUser.zipcode,
          });
          newUser.latitude = latitude;
          newUser.longitude = longitude;
        },
        beforeUpdate: async (updatedUser) => {
          const { latitude, longitude } = await locationToCoordinates({
            zipcode: updatedUser.zipcode,
          });
          updatedUser.latitude = latitude;
          updatedUser.longitude = longitude;
        },
      },
      pet_age_preference: {
        type: DataTypes.ENUM(PetPreferences.PET_AGE),
      },
      pet_type_preference: {
        type: DataTypes.ENUM(PetPreferences.PET_TYPE),
      },
      pet_distance_preference: {
        type: DataTypes.INTEGER,
      },
      pet_dependency_preference: DataTypes.ENUM(PetPreferences.PET_DEPENDENCY),
      pet_activity_preference: DataTypes.ENUM(PetPreferences.PET_ACTIVITY),
      pet_trainability_preference: DataTypes.ENUM(
        PetPreferences.PET_TRAINABILITY
      ),
      pet_social_preference: DataTypes.ENUM(PetPreferences.PET_SOCIABILITY),
      pet_sex_preference: {
        type: DataTypes.ENUM(PetPreferences.PET_SEX),
      },
      pet_experience_level: {
        type: DataTypes.ENUM(PetPreferences.PET_EXPERIENCE_LEVEL),
      },
      pet_good_with_children_preference: DataTypes.BOOLEAN,
      pet_good_with_dogs_preference: DataTypes.BOOLEAN,
      pet_good_with_cats_preference: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: async (newUser) => {
          const { latitude, longitude } = await locationToCoordinates({
            zipcode: newUser.zipcode,
          });
          newUser.latitude = latitude;
          newUser.longitude = longitude;
        },
      },
    }
  );
  user.associate = function (models) {
    user.hasMany(models.liked_pet, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    user.belongsToMany(models.pet, {
      as: 'petsLiked',
      through: models.liked_pet,
      foreignKey: 'user_id',
      otherKey: 'pet_id',
    });
  };
  return user;
};
