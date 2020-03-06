module.exports = (sequelize, DataTypes) => {
  const LikedPet = sequelize.define('Liked_Pet', {
    id: {
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    // userId: {
    //   allowNull: false,
    //   type: DataTypes.UUID,
    // },
    // petId: {
    //   allowNull: false,
    //   type: DataTypes.UUID,
    // },
    likedAt: {
      type: DataTypes.DATE
    }
  }, {});
  LikedPet.associate = function(models) {
    // LikedPet.belongsTo(models.Pets)
    // LikedPet.belongsTo(models.Users)
  };
  return LikedPet;
};