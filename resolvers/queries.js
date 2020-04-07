const { ForbiddenError, ApolloError } = require('apollo-server');
const createPetFilter = require('../utils/randomPets/createPetFilter');

const queries = {
  currentUser: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    const userData = await db.user.findByPk(userId);
    return userData;
  },

  pet: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    return db.pet.findOne({
      where: { id: args.id },
      include: [{ model: db.shelter }, { model: db.user, as: 'likedBy' }],
    });
  },

  shelter: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    return db.shelter.findOne({
      where: { id: args.id },
      include: [{ model: db.pet }],
    });
  },

  randomPet: async (root, args, { db, userId }) => {
    if (!userId)
      throw new ForbiddenError(
        'Sorry, you must be logged in to perform this action'
      );

    const petsQueue = new Set(args.queuedPets);
    const userProfile = await db.user.findByPk(userId);

    const getPetsByFilter = (filter) =>
      db.pet.findAll({
        where: filter,
        include: [{ model: db.shelter }, { model: db.user, as: 'likedBy' }],
      });

    const petFilter = await createPetFilter(userProfile);

    await getPetsByFilter(petFilter)
      .filter((unfilteredPet) => !petsQueue.has(unfilteredPet.id))
      .filter((matchedResult) => matchedResult.likedBy.id !== userProfile.id)
      .then(
        (filteredResults) =>
          (randomPet =
            filteredResults[Math.floor(Math.random() * filteredResults.length)])
      );

    if (!randomPet)
      throw new ApolloError(
        'There are no remaining pets that match the current user preferences'
      );

    return randomPet;
  },
};

module.exports = queries;
