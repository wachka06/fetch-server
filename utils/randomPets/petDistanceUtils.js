const { calculateDistance } = require('../geocoding/index');

const filterByDistance = (user, pet) => {
  userDistanceParams = {
    latitude: user.dataValues.latitude,
    longitude: user.dataValues.longitude,
  };

  petDistanceParams = {
    latitude: pet.dataValues.shelter.dataValues.latitude,
    longitude: pet.dataValues.shelter.dataValues.longitude,
  };

  const distanceToPet = calculateDistance(
    userDistanceParams,
    petDistanceParams
  );

  return distanceToPet <= user.dataValues.pet_distance_preference;
};

const userDistanceToPet = (user, pet) => {
  const userDistanceParams = () => {
    const { latitude, longitude } = user.dataValues;
    return { latitude, longitude };
  };

  const petDistanceParams = () => {
    const { latitude, longitude } = pet.dataValues.shelter.dataValues;
    return { latitude, longitude };
  };

  return calculateDistance(userDistanceParams(), petDistanceParams());
};

module.exports = {
  filterByDistance,
  userDistanceToPet,
};
