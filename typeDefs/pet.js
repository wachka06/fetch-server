const { gql } = require('apollo-server');

const pet = gql`
  type Pet {
    id: ID!
    age: PetAgePreference!
    coat: String
    declawed: Boolean
    description: String
    good_with_children: Boolean
    good_with_dogs: Boolean
    good_with_cats: Boolean
    house_trained: Boolean
    is_mixed_breed: Boolean
    is_unknown_breed: Boolean!
    name: String
    photos: [String]
    primary_breed: String
    primary_color: String!
    secondary_breed: String
    secondary_color: String
    sex: PetSexPreference!
    shots_are_current: Boolean!
    size: PetSizePreference!
    spayed_or_neutered: Boolean
    special_needs: Boolean
    species_name: PetTypePreference
    status: String!
    tertiary_color: String
    shelter: Shelter!
  }

  extend type Query {
    pet(id: ID!): Pet
  }
`;

module.exports = pet;
