'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('liked_pets', [{
        user_id: '80fb45d6-4efe-4bb6-a587-48c006c47438',
        pet_id: '289cefb7-57bd-46e0-b437-063606875175',
        liked_at: new Date()
      }, 
      {
        user_id: '80fb45d6-4efe-4bb6-a587-48c006c47438',
        pet_id: 'bb34f2ac-e7f0-4ee7-9db5-3ddf9c03b808',
        liked_at: new Date()
      },
      {
        user_id: '80fb45d6-4efe-4bb6-a587-48c006c47438',
        pet_id: '89b950ce-0081-4c9e-96be-f5bb98063d3b',
        liked_at: null
      },
      {
        user_id: '104ce257-ec0e-4cde-b9e4-3f916f00f096',
        pet_id: '3a3b7cf7-b5b6-4886-8ab1-13b2e0bce064',
        liked_at: new Date()
      },
      {
        user_id: '104ce257-ec0e-4cde-b9e4-3f916f00f096',
        pet_id: '24a7367e-2e2b-453e-84bd-a0484e309a2d',
        liked_at: null
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('liked_pets', null, {});
    
  }
};
