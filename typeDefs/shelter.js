const { gql } = require('apollo-server');

const shelter = gql`
  type Shelter {
    city: String!
    email: String
    hours: String
    id: ID!
    latitude: Float
    longitude: Float
    name: String
    pets: [Pet]
    phone: String
    state: String!
    street: String!
    street_number: String!
    zipcode: String!
  }

  extend type Query{
    shelter(id: ID!): Shelter
  }
`;

module.exports = shelter;
