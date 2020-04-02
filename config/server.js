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

const testServer = (token, userId) => ({
  context: () => {
    let contextObject;
    if (token) {
      const decodedId = decodedJWT(token);
      contextObject = { db, userId: decodedId };
    } else if (userId) {
      contextObject = { db, userId };
    } else {
      contextObject = { db };
    }
    return contextObject;
  },
  typeDefs,
  resolvers,
});

module.exports = { prodServer, devServer, testServer };
