const PetPreferences = require('../sharedConstants/petPreferenceEnums');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
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
    zipcode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    pet_size_preference: {
      type: DataTypes.ENUM(PetPreferences.SIZE),
    },
    pet_age_preference: {
      type: DataTypes.ENUM(PetPreferences.AGE),
    },
    pet_type_preference: {
      type: DataTypes.ENUM(PetPreferences.TYPE),
    },
    pet_distance_preference: {
      type: DataTypes.INTEGER,
    },
    pet_dependencey_preference: DataTypes.ENUM(PetPreferences.DEPENDENCY),
    pet_activity_preference: DataTypes.ENUM(PetPreferences.ACTIVITY),
    pet_trainability_preference: DataTypes.ENUM(PetPreferences.TRAINABILITY),
    pet_social_preference: DataTypes.ENUM(PetPreferences.SOCIAL),
    pet_sex_preference: {
      type: DataTypes.ENUM(PetPreferences.SEX),
    },
    pet_experience_level: {
      type: DataTypes.ENUM(PetPreferences.EXPERIENCE),
    },
    pet_good_with_children_preference: DataTypes.BOOLEAN,
    pet_good_with_dogs_preference: DataTypes.BOOLEAN,
    pet_good_with_cats_preference: DataTypes.BOOLEAN,
  }, {});
  user.associate = function (models) {
    user.hasMany(models.liked_pet, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    user.belongsToMany(models.pet, {
      as: 'LikedBy',
      through: models.liked_pet,
      foreignKey: 'user_id',
      otherKey: 'pet_id',
    });
  };
  return user;
};
