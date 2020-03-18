module.exports = (sequelize, DataTypes) => {
  const likedPet = sequelize.define('liked_pet', {
    id: {
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    likedAt: {
      type: DataTypes.DATE
    },
    pet_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {});
  likedPet.associate = function(models) {
    likedPet.belongsTo(models.pet, {
      foreignKey: 'pet_id',
      targetKey: 'id'})
    likedPet.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id'})
  };
  return likedPet;
};