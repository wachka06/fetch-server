const petsJSON = require('../pets-02141.json');
const sheltersJSON = require('../shelters-02141.json');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('shelters', sheltersJSON);
    const shelters = await queryInterface.sequelize.query(
      `SELECT id, pet_finder_id FROM shelters;`
    );
    const shelterIdMapping = {};
    shelters[0].forEach((shelter) => {
      shelterIdMapping[shelter.pet_finder_id] = shelter.id;
    });
    const petsToInsert = petsJSON.map((petToEdit) => {
      petToEdit.shelter_id = shelterIdMapping[petToEdit.shelter_id];
      return petToEdit;
    });
    return queryInterface.bulkInsert('pets', petsToInsert);
  },

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('pets', null, {}),
    queryInterface.bulkDelete('shelters', null, {}),
  ]),
};
