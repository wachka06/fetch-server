const { ForbiddenError } = require('apollo-server');

const queries = {
  currentUser: async (root, args, { db, user }) => {
    if (!user) throw new ForbiddenError('Not authorized for that action');
    const userData = await db.user.findByPk(user.id);
    return userData;
  },

  pet: async (root, args, { db }) => 
    db.pet.findOne({
      where: { id: args.id },
      include: [{ model: db.shelter }],
    })
};

module.exports = queries;
