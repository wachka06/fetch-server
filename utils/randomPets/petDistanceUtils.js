const { calculateDistance } = require('../geocoding/index');

const userDistanceToPet = (user, pet) => {
  return calculateDistance(
    ({ latitude, longitude } = user),
    ({ latitude, longitude } = pet.shelter)
  );
};

module.exports = userDistanceToPet;
