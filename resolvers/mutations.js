const { encodedJWT, idTokenIsValid } = require('../utils/auth');

const mutations = {
  createUser: async (root, args, { db }) => {
    const {
      client_id,
      id_token,
      zipcode,
    } = args;
    const loginTicket = await idTokenIsValid(id_token, client_id);
    const [user] = await db.user.findOrCreate({
      where: {
        email: loginTicket.email,
        first_name: loginTicket.given_name,
        last_name: loginTicket.family_name,
        zipcode,
      },
    });
    const token = encodedJWT({ id: user.dataValues.id });
    return { token };
  },
};

module.exports = mutations;
