require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { testServer } = require('../../config/server');
const {
  cleanUpDb,
  closeDbConnection,
  getQuery,
} = require('../../utils/test/index');
const { encodedJWT } = require('../../utils/auth');
const { GET_CURRENT_USER, GET_PET_BY_ID } = require('./test-queries');
const { userDatum, shelterDatum, petDatum } = require('./sample-test-datum');
const db = require('../../models');
require('dotenv').config();

afterEach(cleanUpDb);
afterAll(closeDbConnection);

describe('Query resolvers', () => {
  describe('User queries', () => {
    it('gets the current user', async () => {
      const sampleUser = await db.user.create(userDatum);
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

  describe('Pet Queries', () => {
    it('gets a Pet by the ID', async () => {
      const { query } = await getQuery();
      const sampleShelter = await db.shelter.create(shelterDatum);
      const samplePet = await db.pet.create({
        ...petDatum,
        shelter_id: sampleShelter.id,
      });
      const res = await query({
        query: GET_PET_BY_ID,
        variables: {
          id: samplePet.id,
        },
      });
      expect(res.data.pet.id).toMatch(samplePet.id);
      expect(res.data.pet.shelter.id).toMatch(sampleShelter.id);
    });
    it('returns a database error message if no pet can be found by the provided ID', async () => {
      const { query } = await getQuery();
      const res = await query({
        query: GET_PET_BY_ID,
        variables: {
          id: 'b4b3aabd-4284-40f2-adc2-0b543ad999a6',
        },
      });
      expect(res.data.pet).toBe(null);
    });
    it('returns missing ID error for requests without an pet ID', async () => {
      const { query } = await getQuery();
      const res = await query({
        query: GET_PET_BY_ID,
        variables: {
          id: null,
        },
      });
      expect(res.errors[0].message).toMatch(
        'Variable "$id" of non-null type "ID!" must not be null.'
      );
    });
  });
});
