const { ApolloServer } = require('apollo-server');
const { decodedJWT } = require('./utils/auth');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const db = require('./models');

const server = new ApolloServer({
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
});
server.listen(
  { port: process.env.PORT || 4000 },
).then(({ url }) => {
  console.log(`Woohoo! We are good to go on ${url}!`);
});
