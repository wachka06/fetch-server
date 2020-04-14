const { ForbiddenError, ApolloError } = require('apollo-server');
const createPetFilter = require('../utils/randomPets/createPetFilter');
const userDistanceToPet = require('../utils/randomPets/petDistanceUtils');
const { calculateDistance } = require('../utils/geocoding');

const queries = {
  currentUser: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    const userData = await db.user.findByPk(userId);
    return userData;
  },
  pet: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    const userProfile = await db.user.findByPk(userId);
    const pet = await db.pet.findOne({
      where: { id: args.id },
      include: [{ model: db.shelter }, { model: db.user, as: 'likedBy' }],
    });
    pet.distance_to_user = userDistanceToPet(userProfile, pet);
    return pet;
  },
  shelter: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    return db.shelter.findOne({
      where: { id: args.id },
      include: [{ model: db.pet }],
    });
  },
  likedPet: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    const userLikedpet = await db.liked_pet.findOne({
      where: { id: args.id, user_id: userId },
      include: [{ model: db.user }, { model: db.pet, include: [{ model: db.shelter }] }],
    });
    const userPosition = { latitude: userLikedpet.user.latitude, longitude: userLikedpet.user.longitude };
    const petPosition = { latitude: userLikedpet.pet.shelter.latitude, longitude: userLikedpet.pet.shelter.longitude };
    const distance = calculateDistance(userPosition, petPosition);
    return {
      ...userLikedpet.dataValues,
      distance,
    };
  },
  randomPet: async (root, args, { db, userId }) => {
    if (!userId)
      throw new ForbiddenError(
        'Sorry, you must be logged in to perform this action'
      );
    const userProfile = await db.user.findByPk(userId);
    const petsQueue = new Set(args.queuedPets);

    const getPetsByFilter = (filter) =>
      db.pet.findAll({
        where: filter,
        include: [{ model: db.shelter }, { model: db.user, as: 'likedBy' }],
      });

    const petFilter = await createPetFilter(userProfile);

    await getPetsByFilter(petFilter)
      .filter(
        (petToFilterOnPetQueue) => !petsQueue.has(petToFilterOnPetQueue.id)
      )
      .filter(
        (petToFilterOnLikedBy) =>
          petToFilterOnLikedBy.likedBy.id !== userProfile.id
      )
      .filter(
        (petToFilterByDistance) =>
          userDistanceToPet(userProfile, petToFilterByDistance) <=
          userProfile.pet_distance_preference
      )
      .then(
        (poolOfFilteredPets) =>
          (randomPet =
            poolOfFilteredPets[
              Math.floor(Math.random() * poolOfFilteredPets.length)
            ])
      );

    if (!randomPet)
      throw new ApolloError(
        'There are no remaining pets that match the current user preferences'
      );

    randomPet.distance_to_user = userDistanceToPet(userProfile, randomPet);

    return randomPet;
  },
  likedPets: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    let likedPets = await db.liked_pet.findAll({
      where: { user_id: userId },
      include: [{ model: db.user }, { model: db.pet, include: [{ model: db.shelter }] }],
    });
    const likedPetsWithDistance = likedPets.map((likedPet) => {
      const userPosition = { latitude: likedPet.user.latitude, longitude: likedPet.user.longitude };
      const petPosition = { latitude: likedPet.pet.shelter.latitude, longitude: likedPet.pet.shelter.longitude };
      const distance = calculateDistance(userPosition, petPosition);
      likedPet.distance = distance;
      return likedPet;
      }
    );
    return likedPetsWithDistance;
  },
};

module.exports = queries;
