const db = require('../../models');
const { userDatum } = require('../../resolvers/tests/sample-test-datum');
const { encodedJWT } = require('../auth');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');
const { testServer } = require('../../config/server');

const getQuery = async () => {
  const sampleUser = await db.user.create(userDatum);
  const token = encodedJWT({ id: sampleUser.dataValues.id });
  return createTestClient(new ApolloServer(testServer(token)));
};

module.exports = getQuery;
