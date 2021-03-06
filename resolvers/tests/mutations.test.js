const { gql, ApolloServer, AuthenticationError } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { testServer } = require('../../config/server');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index');
const auth = require('../../utils/auth');
const db = require('../../models');
const {
  CREATE_USER,
  UPDATE_USER,
  CREATE_LIKED_PET,
  UNLIKE_PET,
} = require('./test-mutations');
const {
  shelterDatum,
  petDatum,
  mockIdTokenInfo,
  createUserSample,
  updateUserSample,
  updateUserVariables,
} = require('./sample-test-datum');

afterEach(cleanUpDb);
afterAll(closeDbConnection);
jest.mock('../../utils/auth');

describe('Mutation resolvers', () => {
  describe('createUser', () => {
    it('creates a new user', async () => {
      auth.idTokenIsValid.mockReturnValue(mockIdTokenInfo);
      const { mutate } = createTestClient(new ApolloServer(testServer()));
      await mutate({
        mutation: CREATE_USER,
        variables: {
          auth: {
            client_id: 'clientID',
            id_token: 'invalidToken',
          },
          user: { ...createUserSample },
        },
      });
      const newUser = await db.user.findOne({
        where: { email: 'webapprenticeteam@gmail.com' },
      });
      expect(newUser).toBeDefined();
    });

    it('catches invalid  id_tokens', async () => {
      auth.idTokenIsValid.mockImplementation(() => {
        throw new AuthenticationError('idToken is invalid.');
      });
      const { mutate } = createTestClient(new ApolloServer(testServer()));
      const res = await mutate({
        mutation: CREATE_USER,
        variables: {
          auth: {
            client_id: 'clientID',
            id_token: 'invalidToken',
          },
          user: { ...createUserSample },
        },
      });
      const newUser = await db.user.findOne({
        where: { email: 'webapprenticeteam@gmail.com' },
      });
      expect(newUser).toBeNull();
      expect(res.errors[0].message).toMatch('idToken is invalid.');
    });

    it('sets a default distance preference to 20', async () => {
      auth.idTokenIsValid.mockReturnValue(mockIdTokenInfo);
      const { mutate } = createTestClient(new ApolloServer(testServer()));
      await mutate({
        mutation: CREATE_USER,
        variables: {
          auth: {
            client_id: 'clientID',
            id_token: 'invalidToken',
          },
          user: {
            ...createUserSample,
            pet_distance_preference: undefined,
          },
        },
      });
      const newUser = await db.user.findOne({
        where: { email: 'webapprenticeteam@gmail.com' },
      });
      expect(newUser.dataValues.pet_distance_preference).toBe(20);
    });

    it('will not accept a distance preference greater than 30', async () => {
      auth.idTokenIsValid.mockReturnValue(mockIdTokenInfo);
      const { mutate } = createTestClient(new ApolloServer(testServer()));
      const res = await mutate({
        mutation: CREATE_USER,
        variables: {
          auth: {
            client_id: 'clientID',
            id_token: 'invalidToken',
          },
          user: {
            ...createUserSample,
            pet_distance_preference: 35,
          },
        },
      });
      expect(res.errors[0].message).toBe(
        'Validation error: Validation max on pet_distance_preference failed'
      );
    });
  });

  describe('updateUser', () => {
    it('updates user with updated fields', async () => {
      const user = await db.user.create(updateUserSample);
      const { mutate } = createTestClient(
        new ApolloServer(testServer(null, user.id))
      );
      const res = await mutate({
        mutation: UPDATE_USER,
        variables: { user: { ...updateUserVariables } },
      });
      const updatedUser = await db.user.findByPk(user.id);
      const {
        createdAt,
        updatedAt,
        id,
        longitude,
        latitude,
        ...updatedUserValues
      } = updatedUser.dataValues;
      expect(res.data.updateUser).not.toEqual(user);
      expect(updatedUserValues).toEqual(updateUserVariables);
    });

    it('will not allow for an update to distance preference above the max of 30', async () => {
      const user = await db.user.create(updateUserSample);
      const { mutate } = createTestClient(
        new ApolloServer(testServer(null, user.id))
      );
      const res = await mutate({
        mutation: UPDATE_USER,
        variables: {
          user: { ...updateUserVariables, pet_distance_preference: 35 },
        },
      });
      expect(res.errors[0].message).toBe(
        'Validation error: Validation max on pet_distance_preference failed'
      );
    });

    it('will not allow for an update to distance preference above the max of 30', async () => {
      const user = await db.user.create(updateUserSample);
      const { mutate } = createTestClient(
        new ApolloServer(testServer(null, user.id))
      );
      const res = await mutate({
        mutation: UPDATE_USER,
        variables: {
          user: { ...updateUserVariables, pet_distance_preference: 35 },
        },
      });
      expect(res.errors[0].message).toBe(
        'Validation error: Validation max on pet_distance_preference failed'
      );
    });
  });

  describe('likedPets', () => {

    let userData;
    let shelterData;
    let petData;
    let mutate;

    beforeEach(async () => {

      userData = await db.user.create(updateUserSample);
      shelterData = await db.shelter.create(shelterDatum);
      petData = await db.pet.create({
        ...petDatum,
        shelter_id: shelterData.dataValues.id,
      });
      mutate = createTestClient(new ApolloServer(testServer(null, userData.id)))
        .mutate;

      });
    it('creates an instance of a liked pet with a liked_at date', async () => {
      const likedPetInstance = await mutate({
        mutation: CREATE_LIKED_PET,
        variables: {
          petId: petData.dataValues.id,
          isLiked: true,
        },
      });

      const { liked_at, pet, user } = likedPetInstance.data.likePet;

      expect(pet.id).toMatch(petData.dataValues.id);
      expect(user.id).toMatch(userData.dataValues.id);
      expect(liked_at).toBeTruthy();
    });
    it('creates an instance of a liked pet without a liked_at date', async () => {
      const likedPetInstance = await mutate({
        mutation: CREATE_LIKED_PET,
        variables: {
          petId: petData.dataValues.id,
        },
      });

      const { liked_at, pet, user } = likedPetInstance.data.likePet;

      expect(pet.id).toMatch(petData.dataValues.id);
      expect(user.id).toMatch(userData.dataValues.id);
      expect(liked_at).toBe(null);
    });
    it('unlikes a previously liked pet without destroying the liked pet instance', async () => {
      const likedPetInstance = await mutate({
        mutation: CREATE_LIKED_PET,
        variables: {
          petId: petData.dataValues.id,
          isLiked: true,
        },
      });
      const { likePet } = likedPetInstance.data;

      const dislikedPetInstance = await mutate({
        mutation: UNLIKE_PET,
        variables: {
          likedPetId: likePet.id,
        },
      });
      const { unlikePet } = dislikedPetInstance.data;

      expect(unlikePet.id).toMatch(likePet.id);
      expect(unlikePet.user.id).toMatch(likePet.user.id);
      expect(unlikePet.pet.id).toMatch(likePet.pet.id);
      expect(likePet.liked_at).toBeTruthy();
      expect(unlikePet.liked_at).toBe(null);
    });
  });
});
