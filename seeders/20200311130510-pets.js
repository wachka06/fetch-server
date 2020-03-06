'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('pets', [{
        age: 'adult',
        coat: 'long',
        declawed: false,
        description: 'A fun loving cuddler looking for a fur-ever place to leave his toys',
        good_with_children: true,
        good_with_dogs: true,
        good_with_cats: false,
        house_trained: true,
        is_mixed_breed: true,
        is_unknown_breed: false,
        name: 'Bogart',
        photos: 'photo place holder',
        primary_breed: 'French Bull Dog',
        primary_color: 'white',
        preference_one_value: 1,
        preference_two_value: 3,
        preference_three_value: 2,
        preference_four_value: 4,
        secondary_breed: 'boxer',
        secondary_color: 'brown',
        sex: 'male',
        shelter_id: 'bbad5ad2-859e-4f0f-b751-b330e8190af4',
        shots_are_current: true,
        size: 'small',
        spayed_or_neutered: true,
        special_needs: false,
        species_name: 'dog',
        status: 'available',
        tertiary_color: null,
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('pets', null, {});

  }
};
