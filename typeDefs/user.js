const { gql } = require('apollo-server');

const user = gql`
  type User {
    email: String!
    first_name: String!
    id: ID!
    last_name: String!
    latitude: Float
    longitude: Float
    pet_activity_preference: [Activity]
    pet_age_preference: [Age]
    pet_dependency_preference: [Dependency]
    pet_distance_preference: Int
    pet_experience_level: Experience
    pet_good_with_children_preference: Boolean
    pet_good_with_dogs_preference: Boolean
    pet_good_with_cats_preference: Boolean
    pet_size_preference: [Size]
    pet_sex_preference: [Sex]
    pet_social_preference: [Social]
    pet_trainability_preference: [Trainability]
    pet_type_preference: [Type]
    zipcode: String!
  }

  input AuthInput {
    client_id: String!
    id_token: String!
  }

  input UserCreateInput {
    pet_activity_preference: [Activity]
    pet_age_preference: [Age]
    pet_dependency_preference: [Dependency]
    pet_distance_preference: Int
    pet_experience_level: Experience
    pet_good_with_children_preference: Boolean
    pet_good_with_dogs_preference: Boolean
    pet_good_with_cats_preference: Boolean
    pet_size_preference: [Size]
    pet_sex_preference: [Sex]
    pet_social_preference: [Social]
    pet_trainability_preference: [Trainability]
    pet_type_preference: [Type]
    zipcode: String!
  }

  input UserUpdateInput {
    email: String
    first_name: String
    last_name: String
    pet_activity_preference: [Activity]
    pet_age_preference: [Age]
    pet_dependency_preference: [Dependency]
    pet_distance_preference: Int
    pet_experience_level: Experience
    pet_good_with_children_preference: Boolean
    pet_good_with_dogs_preference: Boolean
    pet_good_with_cats_preference: Boolean
    pet_size_preference: [Size]
    pet_sex_preference: [Sex]
    pet_social_preference: [Social]
    pet_trainability_preference: [Trainability]
    pet_type_preference: [Type]
    zipcode: String
  }

  extend type Query {
    currentUser: User!
  }

  extend type Mutation {
    createUser(auth: AuthInput!, user: UserCreateInput!): JWT
    updateUser(user: UserUpdateInput): User
  }

  type JWT {
    token: String
  }
`;

module.exports = user;
