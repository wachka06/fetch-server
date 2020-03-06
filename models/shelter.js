module.exports = (sequelize, DataTypes) => {
  const Shelter = sequelize.define('Shelters', {
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
  Shelter.associate = function(models) {
    // Shelter.hasMany(models.Pets, {foreignKey: 'shelterId', sourceKey: 'id', onDelete: 'CASCADE'})
  };
  return Shelter;
};