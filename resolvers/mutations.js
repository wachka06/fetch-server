const { ForbiddenError } = require('apollo-server');
const { encodedJWT, idTokenIsValid } = require('../utils/auth');

const mutations = {
  createUser: async (root, args, { db }) => {
    const { auth, user } = args;
    const loginTicket = await idTokenIsValid(auth.id_token, auth.client_id);
    const [newUser] = await db.user.findOrCreate({
      where: { email: loginTicket.email },
      defaults: {
        first_name: loginTicket.given_name,
        last_name: loginTicket.family_name,
        ...user,
      },
    });
    const token = encodedJWT(newUser.dataValues.id);
    return { token };
  },
  updateUser: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    const foundUser = await db.user.findByPk(userId);
    await foundUser.update({ ...args.user });
    await foundUser.reload();
    return { ...foundUser.dataValues };
  },

  likePet: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    let { petId, isLiked } = args;
    isLiked = isLiked ? new Date() : null;
    const newLikedPet = await db.liked_pet.create({
      user_id: userId,
      pet_id: petId,
      liked_at: isLiked,
    });
    return await db.liked_pet.findOne({
      where: { id: newLikedPet.dataValues.id },
      include: [{ model: db.user }, { model: db.pet }],
    });
  },

  unlikePet: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    const { likedPetId } = args;
    const foundLikedPet = await db.liked_pet.findByPk(likedPetId);
    await foundLikedPet.update({ liked_at: null });
    await foundLikedPet.reload({
      include: [{ model: db.user }, { model: db.pet }],
    });
    return foundLikedPet;
  },
};

module.exports = mutations;
