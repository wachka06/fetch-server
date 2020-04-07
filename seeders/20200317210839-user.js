'use strict';

const PetPreferences = require('../sharedConstants/petPreferenceEnumsV2');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'example@example.com',
      first_name: 'John',
      last_name: 'Doe',
      zipcode: '11105',
      pet_size_preference: 'small',
      pet_age_preference: 'young',
      pet_type_preference: 'dog',
      pet_distance_preference: 100,
      pet_dependencey_preference: 'sometimes',
      pet_activity_preference: 'a couch potato',
      pet_trainability_preference: 'a wall flower',
      pet_social_preference: 'class clown',
      pet_sex_preference: 'male',
      pet_experience_level: 'a novice',
      pet_good_with_children_preference: true,
      pet_good_with_dogs_preference: true,
      pet_good_with_cats_preference: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]).catch(error => console.log(error.message));
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  },  
};
