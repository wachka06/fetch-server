
const petfinder = require('../../services/petfinderApi');
const { standardizeAddress } = require('../geocoding');

const formatShelter = async (shelter) => {
  const {
    address,
    email,
    id,
    name,
    phone,
  } = shelter;
  const {
    address1,
    city,
    postcode,
    state,
  } = address;
  const addressString = `${address1} ${city} ${state} ${postcode}`;
  const standardizedAddress = await standardizeAddress(addressString);
  if (standardizedAddress) {
    return {
      city,
      createdAt: new Date(),
      email,
      name,
      hours: JSON.stringify({
        monday: '8:00am-6:30pm',
        tuesday: '8:00am-6:30pm',
        wednesday: '8:00am-6:30pm',
        thursday: '8:00am-6:30pm',
        friday: '8:00am-6:30pm',
        saturday: '8:00am-6:30pm',
        sunday: '8:00am-6:30pm',
      }),
      pet_finder_id: id,
      phone,
      state,
      street: address1.split(' ').slice(1).join(' '),
      street_number: address1.split(' ')[0],
      updatedAt: new Date(),
      zipcode: postcode,
      ...standardizedAddress,
    };
  }
};

const getSheltersPageFromAPI = async (token, page) => {
  const data = await petfinder.getSheltersPage(token, page);
  const formattedShelters = data.shelters.filter((shelterToFilter) => {
    if (shelterToFilter.address.address1 === null) {
      return false;
    }
    return true;
  }).map((curentShelter) => formatShelter(curentShelter));
  if (data.nextPage) {
    const nextShelters = await getSheltersPageFromAPI(token, data.nextPage);
    return formattedShelters.concat(nextShelters);
  }
  return formattedShelters;
};

const getAllShelterPages = async (token, zipcode) => {
  const page = `/v2/organizations?limit=100&location=${zipcode}&distance=40`;
  return getSheltersPageFromAPI(token, page);
};

module.exports = {
  getAllShelterPages,
  getSheltersPageFromAPI,
  formatShelter,
};
