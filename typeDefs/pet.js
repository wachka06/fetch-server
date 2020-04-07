const { gql } = require('apollo-server');

const pet = gql`
  type Pet {
    id: ID!
    age: AGE!
    coat: String
    declawed: Boolean
    description: String
    good_with_children: Boolean
    good_with_dogs: Boolean
    good_with_cats: Boolean
    house_trained: Boolean
    is_mixed_breed: Boolean
    is_unknown_breed: Boolean!
    likedBy: [User]!
    name: String
    pet_activity_value: ACTIVITY
    pet_dependency_value: DEPENDENCY
    pet_social_value: SOCIAL
    pet_trainability_value: TRAINABILITY
    photos: [String]
    primary_breed: String
    primary_color: String!
    recommended_experience_level: EXPERIENCE
    secondary_breed: String
    secondary_color: String
    sex: SEX!
    shots_are_current: Boolean!
    size: SIZE!
    spayed_or_neutered: Boolean
    special_needs: Boolean
    species_name: TYPE
    status: STATUS!
    tertiary_color: String
    shelter: Shelter!
  }

  extend type Query {
    pet(id: ID!): Pet
    randomPet(queuedPets: [ID]): Pet
  }
`;

module.exports = pet;
