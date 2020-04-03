const { gql } = require('apollo-server');

const user = gql`
  type User {
    email: String!
    first_name: String!
    id: ID!
    last_name: String!
    latitude: Float
    longitude: Float
    pet_activity_preference: ACTIVITY
    pet_age_preference: AGE
    pet_dependency_preference: DEPENDENCY
    pet_distance_preference: Int
    pet_experience_level: EXPERIENCE
    pet_good_with_children_preference: Boolean
    pet_good_with_dogs_preference: Boolean
    pet_good_with_cats_preference: Boolean
    pet_size_preference: SIZE
    pet_sex_preference: SEX
    pet_social_preference: SOCIAL
    pet_trainability_preference: TRAINABILITY
    pet_type_preference: TYPE
    zipcode: String!
  }

  input AuthInput {
    client_id: String!
    id_token: String!
  }

  input UserCreateInput {
    pet_activity_preference: ACTIVITY
    pet_age_preference: AGE
    pet_dependency_preference: DEPENDENCY
    pet_distance_preference: Int
    pet_experience_level: EXPERIENCE
    pet_good_with_children_preference: Boolean
    pet_good_with_dogs_preference: Boolean
    pet_good_with_cats_preference: Boolean
    pet_size_preference: SIZE
    pet_sex_preference: SEX
    pet_social_preference: SOCIAL
    pet_trainability_preference: TRAINABILITY
    pet_type_preference: TYPE
    zipcode: String!
  }

  input UserUpdateInput {
    email: String
    first_name: String
    last_name: String
    pet_activity_preference: ACTIVITY
    pet_age_preference: AGE
    pet_dependency_preference: DEPENDENCY
    pet_distance_preference: Int
    pet_experience_level: EXPERIENCE
    pet_good_with_children_preference: Boolean
    pet_good_with_dogs_preference: Boolean
    pet_good_with_cats_preference: Boolean
    pet_size_preference: SIZE
    pet_sex_preference: SEX
    pet_social_preference: SOCIAL
    pet_trainability_preference: TRAINABILITY
    pet_type_preference: TYPE
    zipcode: String
  }

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    createUser(auth: AuthInput! user: UserCreateInput!): JWT
    updateUser(user: UserUpdateInput): User
  }

  type JWT {
    token: String
  }
`;

module.exports = user;
