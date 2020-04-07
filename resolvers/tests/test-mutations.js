const { gql } = require('apollo-server');

const CREATE_USER = gql`
  mutation createUser($auth: AuthInput!, $user: UserCreateInput!) {
    createUser(auth: $auth, user: $user) {
      token
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($user: UserUpdateInput) {
    updateUser(user: $user) {
      email
      first_name
      id
      last_name
      latitude
      longitude
      pet_activity_preference
      pet_age_preference
      pet_dependency_preference
      pet_distance_preference
      pet_experience_level
      pet_good_with_children_preference
      pet_good_with_dogs_preference
      pet_good_with_cats_preference
      pet_size_preference
      pet_sex_preference
      pet_social_preference
      pet_trainability_preference
      pet_type_preference
      zipcode
    }
  }
`;

const CREATE_LIKED_PET = gql`
  mutation likePet($petId: ID!, $isLiked: Boolean) {
    likePet(petId: $petId, isLiked: $isLiked) {
      id
      liked_at
      user {
        id
      }
      pet {
        id
      }
    }
  }
`;

const UNLIKE_PET = gql`
  mutation unlikePet($likedPetId: ID!) {
    unlikePet(likedPetId: $likedPetId) {
      id
      liked_at
      user {
        id
      }
      pet {
        id
      }
    }
  }
`;

module.exports = {
    CREATE_LIKED_PET,
    CREATE_USER,
    UNLIKE_PET,
    UPDATE_USER,
}