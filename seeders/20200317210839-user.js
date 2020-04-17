
const PetPreferences = require('../sharedConstants/petPreferenceEnumsV2');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'webapprenticeteam@gmail.com',
      first_name: 'John',
      last_name: 'Doe',
      latitude: 42.36708055,
      longitude: -71.08028022869824,
      zipcode: '02141',
      pet_size_preference: PetPreferences.PET_SIZE,
      pet_age_preference: PetPreferences.PET_AGE,
      pet_type_preference: PetPreferences.PET_TYPE,
      pet_distance_preference: 30,
      pet_dependency_preference: PetPreferences.PET_DEPENDENCY,
      pet_activity_preference: PetPreferences.PET_ACTIVITY,
      pet_trainability_preference: PetPreferences.PET_TRAINABILITY,
      pet_social_preference: PetPreferences.PET_SOCIABILITY,
      pet_sex_preference: PetPreferences.PET_SEX,
      pet_experience_level: PetPreferences.PET_EXPERIENCE_LEVEL[0],
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
