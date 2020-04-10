const fs = require('fs');

const generatePetsWithSheltersJSON = (zipcode) => {
  const sheltersJSON = JSON.parse(fs.readFileSync(`shelters-${zipcode}.json`));
  const petsJSON = JSON.parse(fs.readFileSync(`pets-${zipcode}.json`));
  const shelterMapping = {};
  sheltersJSON.forEach((shelter) => {
    shelter.pets = [];
    shelterMapping[shelter.pet_finder_id] = shelter;
  });
  petsJSON.forEach((pet) => {
    shelterMapping[pet.shelter_id].pets.push(pet);
  });
  fs.writeFileSync(`petsWithShelters-${zipcode}.json`, JSON.stringify(shelterMapping, null, 2));
};

generatePetsWithSheltersJSON([process.env.ZIPCODE]);
