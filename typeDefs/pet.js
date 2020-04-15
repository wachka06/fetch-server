const { gql } = require('apollo-server');

const pet = gql`
  type Pet {
    id: ID!
    age: Age!
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
    pet_activity_value: Activity
    pet_dependency_value: Dependency
    pet_social_value: Social
    pet_trainability_value: Trainability
    photos: [String]
    primary_breed: String
    primary_color: String!
    recommended_experience_level: Experience
    secondary_breed: String
    secondary_color: String
    sex: Sex!
    shots_are_current: Boolean!
    size: Size!
    spayed_or_neutered: Boolean
    special_needs: Boolean
    species_name: Type
    status: Status!
    tertiary_color: String
    shelter: Shelter!
    distance_to_user: Float
  }

  extend type Query {
    pet(id: ID!): Pet
    randomPet(queuedPets: [ID]): Pet
  }
`;

module.exports = pet;
