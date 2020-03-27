const { decodedJWT } = require('../utils/auth');
const typeDefs = require('../typeDefs');
const resolvers = require('../resolvers');
const db = require('../models');


const prodServer = {
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
      const user = decodedJWT(token);
      return { db, user };
    }
    return { db };
  },
  typeDefs,
  resolvers,
};

const devServer = {
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
      const user = decodedJWT(token);
      return { db, user };
    }
    return { db };
  },
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
};

const testServer = (token) => ({
  context: () => {
    if (token) {
      const user = decodedJWT(token);
      return { db, user };
    }
    return { db };
  },
  typeDefs,
  resolvers,
});

module.exports = { prodServer, devServer, testServer };
