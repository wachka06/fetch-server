const PetPreferences = require('../sharedConstants/petPreferenceEnums');

module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    id: {
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    name: DataTypes.STRING,
    age: {
      type: DataTypes.ENUM(PetPreferences.AGE),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(PetPreferences.STATUS),
      allowNull: false
    },
    description: DataTypes.STRING,
    photos: DataTypes.ARRAY(DataTypes.STRING),
    shelter_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    size: {
      allowNull: false,
      type: DataTypes.ENUM(PetPreferences.SIZE)
    },
    sex: {
      type: DataTypes.ENUM(PetPreferences.SEX),
      allowNull: false
    },
    primary_breed: DataTypes.STRING,
    secondary_breed: DataTypes.STRING,
    is_mixed_breed: DataTypes.BOOLEAN,
    is_unknown_breed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    species_name: {
      type: DataTypes.ENUM(PetPreferences.TYPE)
    },
    coat: DataTypes.STRING,
    primary_color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondary_color: DataTypes.STRING,
    tertiary_color: DataTypes.STRING,
    spayed_or_neutered: DataTypes.BOOLEAN,
    house_trained: DataTypes.BOOLEAN,
    declawed: DataTypes.BOOLEAN,
    special_needs: DataTypes.BOOLEAN,
    shots_are_current: DataTypes.BOOLEAN,
    good_with_children: DataTypes.BOOLEAN,
    good_with_dogs: DataTypes.BOOLEAN,
    good_with_cats: DataTypes.BOOLEAN,
    pet_dependency_value: DataTypes.ENUM(PetPreferences.DEPENDENCY),
    pet_activity_value: DataTypes.ENUM(PetPreferences.ACTIVITY),
    pet_social_value: DataTypes.ENUM(PetPreferences.SOCIAL),
    pet_trainability_value: DataTypes.ENUM(PetPreferences.TRAINABILITY),
    recommended_experience_level: DataTypes.ENUM(PetPreferences.EXPERIENCE),
  }, {});
  pet.associate = function(models) {
    pet.hasMany(models.liked_pet, {
      foreignKey: 'pet_id',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    })
    pet.belongsTo(models.shelter, {
      foreignKey: 'shelter_id', 
      targetKey: 'id'
    })
    pet.belongsToMany(models.user, { 
      as: 'PetsLiked', 
      through: models.liked_pet, 
      foreignKey: 'pet_id',
      otherKey: 'user_id'
    })
  };
  return pet;
};