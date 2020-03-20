const PetPreferences = require('../sharedConstants/petPreferenceEnums');

module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    id: {
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    age: {
      type: DataTypes.ENUM(PetPreferences.AGE),
      allowNull: false
    },
    coat: DataTypes.STRING,
    declawed: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    good_with_children: DataTypes.BOOLEAN,
    good_with_dogs: DataTypes.BOOLEAN,
    good_with_cats: DataTypes.BOOLEAN,
    house_trained: DataTypes.BOOLEAN,
    is_mixed_breed: DataTypes.BOOLEAN,
    is_unknown_breed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: DataTypes.STRING,
    photos: DataTypes.ARRAY(DataTypes.STRING),
    primary_breed: DataTypes.STRING,
    primary_color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondary_breed: DataTypes.STRING,
    secondary_color: DataTypes.STRING,
    sex: {
      type: DataTypes.ENUM(PetPreferences.SEX),
      allowNull: false
    },
    shelter_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    shots_are_current: DataTypes.BOOLEAN,
    size: {
      allowNull: false,
      type: DataTypes.ENUM(PetPreferences.SIZE)
    },
    spayed_or_neutered: DataTypes.BOOLEAN,
    special_needs: DataTypes.BOOLEAN,
    species_name: {
      type: DataTypes.ENUM(PetPreferences.TYPE)
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tertiary_color: DataTypes.STRING
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