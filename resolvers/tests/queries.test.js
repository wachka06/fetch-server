/* eslint-disable no-undef */
const { gql, ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { testServer } = require('../../config/server');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index');
const { encodedJWT } = require('../../utils/auth');
const db = require('../../models');
require('dotenv').config();

afterEach(cleanUpDb);
afterAll(closeDbConnection);

const GET_CURRENT_USER = gql`
query {
  currentUser {
    first_name
    last_name
    email
    id
    zipcode
    pet_age_preference
    pet_distance_preference
    pet_size_preference
    pet_type_preference
  }
}
`;

describe('Query resolvers', () => {
  it('gets the current user', async () => {
    const sampleUser = await db.user.create({
      email: 'gtoledo342@gmail.com',
      first_name: 'Gabe',
      last_name: 'Toledo',
      zipcode: '98104',
      pet_distance_preference: 10,
      pet_age_preference: 'young',
      pet_size_preference: 'small',
      pet_type_preference: 'dog',
    });
    const token = encodedJWT({ id: sampleUser.dataValues.id });
    const { query } = createTestClient(new ApolloServer(testServer(token)));
    const res = await query({ query: GET_CURRENT_USER });
    expect(res.data.currentUser.email).toMatch(sampleUser.email);
  });

  it('should return an error when no token present', async () => {
    const token = undefined;
    const { query } = createTestClient(new ApolloServer(testServer(token)));
    const res = await query({ query: GET_CURRENT_USER });
    expect(res.errors[0].message).toMatch('Not authorized for that action');
  });
});
