const fs = require('fs');
const { getToken } = require('../services/petfinderApi');
const { getPetsFromShelter } = require('../utils/seeding/pet');
const { getAllShelterPages } = require('../utils/seeding/shelter');

const generatepetsAndSheltersJSON = async (zipcode) => {
  const token = await getToken();
  const allShelters = await getAllShelterPages(token, zipcode);
  Promise.all(allShelters)
    .then((shelters) => {
      const filteredShelters = shelters.filter((shelter) => {
        if (shelter) return true;
        return false;
      });
      const sheltersFilename = `shelters-${zipcode}.json`;
      fs.writeFileSync(sheltersFilename, JSON.stringify(filteredShelters, null, 2));
      const sheltersJSON = JSON.parse(fs.readFileSync(sheltersFilename, 'utf8'));
      const pets = sheltersJSON.map((shelter) => getPetsFromShelter(token, shelter.pet_finder_id));
      Promise.all(pets).then((petsResolved) => {
        const allPets = petsResolved.reduce((result, currentPets) => result.concat(currentPets));
        fs.writeFileSync(`pets-${zipcode}.json`, JSON.stringify(allPets, null, 2));
      });
    });
};

generatepetsAndSheltersJSON(process.env.ZIPCODE);
