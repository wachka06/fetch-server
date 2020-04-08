/* eslint-disable no-undef */
const { gql, ApolloServer, AuthenticationError } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { testServer } = require('../../config/server');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index');
const auth = require('../../utils/auth');
const db = require('../../models');

afterEach(cleanUpDb);
afterAll(closeDbConnection);
jest.mock('../../utils/auth');

const CREATE_USER = gql`
  mutation createUser($auth: AuthInput!, $user: UserCreateInput!) {
    createUser(auth: $auth, user: $user) {
      token
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($user: UserUpdateInput) {
    updateUser(user: $user) {
      email
      first_name
      id
      last_name
      latitude
      longitude
      pet_activity_preference
      pet_age_preference
      pet_dependency_preference
      pet_distance_preference
      pet_experience_level
      pet_good_with_children_preference
      pet_good_with_dogs_preference
      pet_good_with_cats_preference
      pet_size_preference
      pet_sex_preference
      pet_social_preference
      pet_trainability_preference
      pet_type_preference
      zipcode
    }
  }
`;

const mockIdTokenInfo = {
  email: 'webapprenticeteam@gmail.com',
  name: 'Web Apprentice Team',
  picture:
    'https://lh5.googleusercontent.com/-4Or8kbjRqT4/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nDnBdEORHOznTw4q10CRVxtJ9U96A/s96-c/photo.jpg',
  given_name: 'Web Apprentice',
  family_name: 'Team',
};

const createUserSample = {
  pet_activity_preference: 'A_COUCH_POTATO',
  pet_age_preference: 'ADULT',
  pet_dependency_preference: 'SOMEWHAT_DEPENDENT',
  pet_distance_preference: 20,
  pet_experience_level: 'EXPERIENCED',
  pet_good_with_children_preference: true,
  pet_good_with_dogs_preference: true,
  pet_good_with_cats_preference: true,
  pet_size_preference: 'MEDIUM',
  pet_sex_preference: 'MALE',
  pet_social_preference: 'A_WALL_FLOWER',
  pet_trainability_preference: 'CLASS_CLOWN',
  pet_type_preference: 'CAT',
  zipcode: '98104',
};

const updateUserSample = {
  email: 'gtoledo342@gmail.com',
  first_name: 'Gabe',
  last_name: 'Toledo',
  pet_activity_preference: 'A_COUCH_POTATO',
  pet_age_preference: 'ADULT',
  pet_dependency_preference: 'SOMEWHAT_DEPENDENT',
  pet_distance_preference: 20,
  pet_experience_level: 'EXPERIENCED',
  pet_good_with_children_preference: true,
  pet_good_with_dogs_preference: true,
  pet_good_with_cats_preference: true,
  pet_size_preference: 'MEDIUM',
  pet_sex_preference: 'MALE',
  pet_social_preference: 'A_WALL_FLOWER',
  pet_trainability_preference: 'CLASS_CLOWN',
  pet_type_preference: 'CAT',
  zipcode: '98104',
};

const updateUserVariables = {
  email: 'gto342@gmail.com',
  first_name: 'Gab',
  last_name: 'Toled',
  pet_activity_preference: 'A_COUCH_POTATO',
  pet_age_preference: 'ADULT',
  pet_dependency_preference: 'SOMEWHAT_DEPENDENT',
  pet_distance_preference: 20,
  pet_experience_level: 'EXPERIENCED',
  pet_good_with_children_preference: true,
  pet_good_with_dogs_preference: true,
  pet_good_with_cats_preference: true,
  pet_size_preference: 'MEDIUM',
  pet_sex_preference: 'MALE',
  pet_social_preference: 'A_WALL_FLOWER',
  pet_trainability_preference: 'CLASS_CLOWN',
  pet_type_preference: 'DOG',
  zipcode: '92014',
};

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
      } = updatedUser.dataValues
      expect(res.data.updateUser).not.toEqual(user);
      expect(updatedUserValues).toEqual(updateUserVariables);
    });
  });
});
