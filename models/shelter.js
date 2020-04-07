
module.exports = (sequelize, DataTypes) => {
  const shelter = sequelize.define('shelter', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,

    street: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    street_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    zipcode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
    hours: DataTypes.JSONB,
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    pet_finder_id: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
  });
  shelter.associate = function(models) {
    shelter.hasMany(models.pet, {
      foreignKey: 'shelter_id',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return shelter;
};
