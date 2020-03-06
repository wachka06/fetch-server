'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        first_name: 'James',
        last_name: 'Hankins',
        email: 'James.Hankins@accenture.com',
        location: `{
          "city": "Cleveland",
          "state": "Ohio",
          "zipcode": "44720"
        }`,
        pet_age_preference: 'young',
        pet_distance_preference: '10 miles',
        pet_size_preference: 'large',
        pet_type_preference: 'dog',
        pet_preference_one: 2,
        pet_preference_two: 3,
        pet_preference_three: 1,
        pet_preference_four: 3,
      }, ]);
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  },  
};

