const { ForbiddenError } = require('apollo-server');

const queries = {
  currentUser: async (root, args, { db, userId }) => {
    if (!userId) throw new ForbiddenError('Not authorized for that action');
    const userData = await db.user.findByPk(userId);
    return userData;
  },

  pet: async (root, args, { db }) => 
    db.pet.findOne({
      where: { id: args.id },
      include: [{ model: db.shelter }],
    })
};

module.exports = queries;
