module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pets', {
    id: {
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    age: {
      type: DataTypes.STRING,
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
    photos: DataTypes.STRING,
    primary_breed: DataTypes.STRING,
    primary_color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preference_one_value: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    preference_two_value: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    preference_three_value: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    preference_four_value: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    secondary_breed: DataTypes.STRING,
    secondary_color: DataTypes.STRING,
    sex: {
      type: DataTypes.ENUM({
        values: ['male', 'female', 'unknown']
      }),
      allowNull: false
    },
    shelterId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    shots_are_current: DataTypes.BOOLEAN,
    size: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['small','medium','large']
      })
    },
    spayed_or_neutered: DataTypes.BOOLEAN,
    special_needs: DataTypes.BOOLEAN,
    species_name: {
      type: DataTypes.ENUM({
        values: ['dog','cat']
      })
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tertiary_color: DataTypes.STRING
  }, {});
  Pet.associate = function(models) {
    // Pet.belongsToMany(models.Users, { through: 'Liked_Pet', onDelete: 'CASCADE'});
    // Pet.hasMany(models.Liked_Pet, { onDelete: 'CASCADE' })
    // Pet.belongsTo(models.Shelters, {foreignKey: 'shelterId', targetKey: 'id'})
  };
  return Pet;
};