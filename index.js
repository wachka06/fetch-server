const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs, resolvers, playground: true, introspection: true,
});
server.listen(
  { port: process.env.PORT || 4000 },
).then(({ url }) => {
  console.log(`Woohoo! We are good to go on ${url}!`);
});
