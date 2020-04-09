const { gql } = require('apollo-server');
const user = require('./user');
const pet = require('./pet');
const likedPet = require('./liked_pets');
const shelter = require('./shelter');

const root = gql`
  enum Age {
    YOUNG
    ADULT
    SENIOR
  }

  enum Dependency {
    INDEPENDENT
    SOMEWHAT_DEPENDENT
    DEPENDENT
  }

  enum Size {
    SMALL
    MEDIUM
    LARGE
  }

  enum Sex {
    MALE
    FEMALE
  }

  enum Status {
    ADOPTED
    NOT_ADOPTED
  }

  enum Type {
    DOG
    CAT
    NO_PREFERENCE
  }

  enum Experience {
    AN_EXPERT
    EXPERIENCED
    A_NOVICE
  }

  enum Activity {
    A_COUCH_POTATO
    ACTIVE
    AN_ATHLETE
  }

  enum Social {
    A_WALL_FLOWER
    SOCIAL
    LIFE_OF_THE_PARTY
  }

  enum Trainability {
    CLASS_CLOWN
    ATTENTIVE_STUDENT
    TEACHERS_PET
  }

  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [root, user, pet, shelter, likedPet];

module.exports = typeDefs;
