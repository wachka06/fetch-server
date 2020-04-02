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
    await foundUser.update({ ...args });
    await foundUser.reload();
    return { ...foundUser.dataValues };
  },
};

module.exports = mutations;
