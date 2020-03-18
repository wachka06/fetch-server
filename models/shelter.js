module.exports = (sequelize, DataTypes) => {
  const shelter = sequelize.define('shelter', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    location: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    name: DataTypes.STRING,
    hours: DataTypes.JSONB,
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    organization_id: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    }
  }, {});
  shelter.associate = function(models) {
    shelter.hasMany(models.pet, {
      foreignKey: 'shelter_id', 
      sourceKey: 'id', 
      onDelete: 'CASCADE'})
  };
  return shelter;
};