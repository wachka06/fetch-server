module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pets = await queryInterface.sequelize.query(
      `SELECT id FROM pets;`
    );
    const user = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'webapprenticeteam@gmail.com';`
    );
    const likedPetsToInsert = pets[0].map((pet) => {
      return {
        liked_at: new Date(),
        pet_id: pet.id,
        user_id: user[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    return queryInterface.bulkInsert('liked_pets', likedPetsToInsert);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('liked_pets', null, {}),
};
