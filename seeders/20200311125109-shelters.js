'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('shelters', [{
        name: 'Bean-Town Pups and Kitties',        
        location: `{
          "city": "Boston",
          "state": "MA",
          "zip": "02144"
        }`,
        hours: `{
          "monday": "9-5",
          "tuesday": "9-5",
          "wednesday": "9-5",
          "thursday": "9-5",
          "friday": "9-5",
          "saturday": "9-5",
          "sunday": "9-5"
        }`,
        phone: '(617) 214 - 3131',
        email: 'BTPupsNKitties@BostonShelters.com',
        organization_id: 'A104',
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('shelters', null, {});
      
  }
};
