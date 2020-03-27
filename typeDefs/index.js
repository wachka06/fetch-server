const { gql } = require('apollo-server');
const user = require('./user');

const root = gql`
  enum PetTypePreference {
    dog
    cat
    no preference
  }

  enum PetAgePreference {
    young
    adult
    old
  }

  enum PetSizePreference {
    small
    medium
    large
  }
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;


const typeDefs = [root, user];

module.exports = typeDefs;
