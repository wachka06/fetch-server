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
    pet_age_preference: DataTypes.ENUM(PetPreferences.AGE),
    pet_distance_preference: DataTypes.INTEGER,
    pet_size_preference: DataTypes.ENUM(PetPreferences.SIZE),
    pet_type_preference: DataTypes.ENUM(PetPreferences.TYPE),
  }, {});
  user.associate = function (models) {
    user.hasMany(models.liked_pet, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    })
    user.belongsToMany(models.pet, {
      as: 'LikedBy',
      through: models.liked_pet,
      foreignKey: 'user_id',
      otherKey: 'pet_id'
    })
  };
  return user;
};
