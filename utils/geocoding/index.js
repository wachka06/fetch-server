const axios = require('axios');

const EARTH_RADIUS_MILES = 3958.8;
const LATITUDINAL_DEGREES_PER_MILE = 0.01449275;

const locationToCoordinates = async (location) => {
  const {
    streetNumber,
    street,
    city,
    state,
    zipcode,
  } = location;
  let url = 'https://nominatim.openstreetmap.org/search?format=json&country=usa';
  if (street) {
    url += `&street=${streetNumber} ${street}`;
  }
  if (city) {
    url += `&city=${city}`;
  }
  if (state) {
    url += `&state=${state}`;
  }
  if (zipcode) {
    url += `&postalcode=${zipcode}`;
  }
  const geoData = await axios.get(url).catch((error) => { throw error; });
  return {
    latitude: geoData.data[0].lat,
    longitude: geoData.data[0].lon,
  };
};

const coordinatesToLocation = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  const geoData = await axios.get(url);
  return {
    streetNumber: geoData.data.address.house_number,
    street: geoData.data.address.road,
    city: geoData.data.address.city,
    state: geoData.data.address.state,
    zipcode: geoData.data.address.postcode,
  };
};

// https://en.wikipedia.org/wiki/Haversine_formula
const calculateDistance = (pointA, pointB) => {
  const lat1 = pointA.latitude * (Math.PI / 180);
  const lng1 = pointA.longitude * (Math.PI / 180);
  const lat2 = pointB.latitude * (Math.PI / 180);
  const lng2 = pointB.longitude * (Math.PI / 180);
  const haversine = (Math.sin((lat2 - lat1) / 2) * Math.sin((lat2 - lat1) / 2)
                    + Math.cos(lat1) * Math.cos(lat2)
                    * Math.sin((lng2 - lng1) / 2) * Math.sin((lng2 - lng1) / 2));
  return Math.round(2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(haversine)));
};

const calculateLatitudeRange = (userLatitutde, rangeMiles) => {
  const maxLatitude = userLatitutde + (rangeMiles * LATITUDINAL_DEGREES_PER_MILE);
  const minLatitude = userLatitutde - (rangeMiles * LATITUDINAL_DEGREES_PER_MILE);
  return { maxLatitude, minLatitude };
};

const longitudinalMiles = (latitude) => {
  const circumference = 2 * Math.PI * (Math.cos(latitude) * EARTH_RADIUS_MILES);
  const lengthOfDegree = circumference / 360;
  return 1 / lengthOfDegree;
};

const calculateLongitudeRange = (userLongitude, userLatitude, rangeMiles) => {
  const longitudinalDegreesPerMile = longitudinalMiles(userLatitude);
  const maxLongitude = userLongitude + (rangeMiles * longitudinalDegreesPerMile);
  const minLongitude = userLongitude - (rangeMiles * longitudinalDegreesPerMile);
  return { maxLongitude, minLongitude };
};

module.exports = {
  calculateDistance,
  calculateLatitudeRange,
  calculateLongitudeRange,
  locationToCoordinates,
  coordinatesToLocation,
};
