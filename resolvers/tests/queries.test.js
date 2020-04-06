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
const {
  GET_CURRENT_USER,
  GET_PET_BY_ID,
  GET_RANDOM_PET,
  GET_SHELTER,
} = require('./test-queries');
const {
  userDatum,
  shelterDatum,
  petDatum,
  multiplePetsDatum,
} = require('./sample-test-datum');
const db = require('../../models');
require('dotenv').config();

afterEach(cleanUpDb);
afterAll(closeDbConnection);

describe('Query resolvers', () => {
  describe('User queries', () => {
    it('gets the current user', async () => {
      const sampleUser = await db.user.create(userDatum);
      const token = encodedJWT(sampleUser.dataValues.id);
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
    it('should return a shelter with the pet', async () => {
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
      const shelterTest = { ...sampleShelter.dataValues };
      delete shelterTest.createdAt;
      delete shelterTest.pet_finder_id;
      delete shelterTest.updatedAt;
      expect(res.data.pet.shelter).toEqual(shelterTest);
    });
    it('returns a shelter to correspond with the pet, and an array of users who have liked the pet', async () => {
      const { query } = await getQuery();
      const sampleShelter = await db.shelter.create(shelterDatum);
      const sampleUser = await db.user.findOne({
        where: { first_name: userDatum.first_name },
      });
      const samplePet = await db.pet.create({
        ...petDatum,
        shelter_id: sampleShelter.id,
      });
      await db.liked_pet.create({
        user_id: sampleUser.id,
        pet_id: samplePet.id,
      });
      const res = await query({
        query: GET_PET_BY_ID,
        variables: {
          id: samplePet.id,
        },
      });
      expect(res.data.pet.shelter.id).toBe(sampleShelter.id);
      expect(res.data.pet.likedBy[0].id).toBe(sampleUser.id);
    });
  });

  describe('Shelter queries', () => {
    it('should return a shelter with all associated pets', async () => {
      const sampleShelter = await db.shelter.create(shelterDatum);
      const samplePet = await db.pet.create({
        ...petDatum,
        shelter_id: sampleShelter.id,
      });
      const { query } = createTestClient(
        new ApolloServer(testServer(null, 'usertoken'))
      );
      const res = await query({
        query: GET_SHELTER,
        variables: {
          id: sampleShelter.id,
        },
      });
      const testObject = {
        ...sampleShelter.dataValues,
        pets: [{ id: samplePet.id, name: samplePet.name }],
      };

      delete testObject.createdAt;
      delete testObject.updatedAt;
      delete testObject.pet_finder_id;

      expect(res.data.shelter).toEqual(testObject);
    });
  });

  describe('Random pet queries', () => {
    beforeEach(async () => {
      testShelter = await db.shelter.create(shelterDatum);
      multiplePetsDatum.map((pet) =>
        db.pet.create({
          ...pet,
          shelter_id: testShelter.id,
        })
      );
    });
    it('Should be seeded with pets and shelters', async () => {
      const samplePetsArray = await db.pet.findAll();
      const sampleShelter = await db.shelter.findAll();
      expect(samplePetsArray[0].shelter_id).toBe(sampleShelter[0].id);
      expect(sampleShelter[0].id).toBe(testShelter.id);
    });
    it('Should have a current user', async () => {
      const { query } = await getQuery();
      const res = await query({ query: GET_CURRENT_USER });
      expect(res.data.currentUser.first_name).toMatch(userDatum.first_name);
    });
    it('Should return a random pet based on the current user criteria', async () => {
      const { query } = await getQuery();
      const currentUser = await query({ query: GET_CURRENT_USER });
      const randomPet = await query({ query: GET_RANDOM_PET });
      expect(randomPet.data.randomPet.species_name).toBe(
        currentUser.data.currentUser.pet_type_preference
      );
      expect(randomPet.data.randomPet.age).toBe(
        currentUser.data.currentUser.pet_age_preference
      );
      expect(randomPet.data.randomPet.size).toBe(
        currentUser.data.currentUser.pet_size_preference
      );
    });
    it('Should filter out liked pets from possible responses', async () => {
      const { query } = await getQuery();
      const currentUser = await query({ query: GET_CURRENT_USER });
      const firstRandomPet = await query({ query: GET_RANDOM_PET });
      await db.liked_pet.create({
        user_id: currentUser.data.currentUser.id,
        pet_id: firstRandomPet.data.randomPet.id,
      });
      const secondRandomPet = await query({ query: GET_RANDOM_PET });
      expect(firstRandomPet.data.randomPet).not.toBe(
        secondRandomPet.data.randomPet
      );
    }),
      it('Should return a custom error if no current user is detected', async () => {
        const { query } = createTestClient(new ApolloServer(testServer()));
        const res = await query({ query: GET_RANDOM_PET });
        expect(res.errors[0].message).toBe(
          `Sorry, you must be logged in to perform this action`
        );
      });
    it('Should return a custom error if no pets are available to be returned', async () => {
      const { query } = await getQuery();
      await db.pet
        .findAll()
        .then((pets) =>
          pets.map(
            async (pet) => await db.pet.destroy({ where: { id: pet.id } })
          )
        );
      const res = await query({ query: GET_RANDOM_PET });
      expect(res.errors[0].message).toBe(
        `There are no remaining pets that match the current user preferences`
      );
    });
  });
});
