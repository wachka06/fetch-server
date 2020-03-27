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
  mutation(
    $client_id: String!
    $id_token: String!
    $zipcode: String!
  ){
    createUser(
        client_id: $client_id
        id_token: $id_token
        zipcode: $zipcode
      ){
        token
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

describe('Mutation resolvers', () => {
  it('creates a new user', async () => {
    auth.idTokenIsValid.mockReturnValue(mockIdTokenInfo);
    const { mutate } = createTestClient(new ApolloServer(testServer()));
    await mutate({
      mutation: CREATE_USER,
      variables: {
        client_id: 'clientId',
        id_token: 'validToken',
        zipcode: '98104',
      },
    });
    const newUser = await db.user.findOne({ where: { email: 'webapprenticeteam@gmail.com' } });
    expect(newUser).toBeDefined();
  });

  it('catches invalid  id_tokens', async () => {
    auth.idTokenIsValid.mockImplementation(() => { throw new AuthenticationError('idToken is invalid.'); });
    const { mutate } = createTestClient(new ApolloServer(testServer()));
    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        client_id: 'clientID',
        id_token: 'invalidToken',
        zipcode: '98104',
      },
    });
    const newUser = await db.user.findOne({ where: { email: 'webapprenticeteam@gmail.com' } });
    expect(newUser).toBeNull();
    expect(res.errors[0].message).toMatch('idToken is invalid.');
  });
});
