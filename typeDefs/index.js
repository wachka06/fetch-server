const { gql } = require('apollo-server');
const user = require('./user');
const pet = require('./pet');
const likedPet = require('./liked_pets');
const shelter = require('./shelter');

const root = gql`
  enum AGE {
    YOUNG
    ADULT
    SENIOR
  }

  enum DEPENDENCY {
    INDEPENDENT
    SOMEWHAT_DEPENDENT
    DEPENDENT
  }

  enum SIZE {
    SMALL
    MEDIUM
    LARGE
  }

  enum SEX {
    MALE
    FEMALE
  }

  enum STATUS {
    ADOPTED
    NOT_ADOPTED
  }

  enum TYPE {
    DOG
    CAT
    NO_PREFERENCE
  }

  enum EXPERIENCE {
    AN_EXPERT
    EXPERIENCED
    A_NOVICE
  }

  enum ACTIVITY {
    A_COUCH_POTATO
    ACTIVE
    AN_ATHLETE
  }

  enum SOCIAL {
    A_WALLFLOWER
    SOCIAL
    LIFE_OF_THE_PARTY
  }

  enum TRAINABILITY {
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
