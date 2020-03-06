/* eslint-disable object-shorthand */
/* eslint-disable func-names */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      unique: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    pet_type_preference: DataTypes.STRING,
    pet_size_preference: DataTypes.STRING,
    pet_age_preference: DataTypes.STRING,
    location: DataTypes.STRING,
    pet_distance_preference: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Pets, { through: 'Liked_Pets' });
  };
  return User;
};