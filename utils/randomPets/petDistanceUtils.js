const { calculateDistance } = require('../geocoding/index');

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

module.exports = userDistanceToPet;
