const { gql } = require('apollo-server');

const user = gql`
  type User {
    first_name: String!
    last_name: String!
    email: String!
    id: ID!
    zipcode: String
    pet_age_preference: AGE
    pet_distance_preference: Int
    pet_size_preference: SIZE
    pet_type_preference: TYPE
  }

  extend type Query {
    currentUser: User!
  }

  extend type Mutation {
    createUser(client_id: String!, id_token: String!, zipcode: String!): JWT!
  }

  type JWT {
    token: String
  }
`;

module.exports = user;
