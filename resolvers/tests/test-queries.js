const { gql } = require('apollo-server');

const GET_CURRENT_USER = gql`
  query {
    currentUser {
      first_name
      last_name
      email
      id
      zipcode
      pet_age_preference
      pet_distance_preference
      pet_size_preference
      pet_type_preference
    }
  }
`;

const GET_PET_BY_ID = gql`
  query($id: ID!) {
    pet(id: $id) {
      id
      shelter {
        id
        name
        street_number
        street
        city
        state
        zipcode
        hours
        phone
        email
        longitude
        latitude
      }
      likedBy {
        id
      }
    }
  }
`;

const GET_RANDOM_PET = gql`
  query($queuedPets: [ID]) {
    randomPet(queuedPets: $queuedPets) {
      id
      age
      good_with_cats
      good_with_children
      good_with_dogs
      likedBy {
        id
      }
      name
      pet_activity_value
      pet_dependency_value
      pet_social_value
      pet_trainability_value
      sex
      size
      species_name
      shelter {
        city
        email
        hours
        id
        latitude
        longitude
        name
        phone
        state
        street
        street_number
        zipcode
      }
      distance_to_user
    }
  }
`;

const GET_SHELTER = gql`
  query($id: ID!) {
    shelter(id: $id) {
      city
      email
      hours
      id
      latitude
      longitude
      name
      phone
      pets {
        id
        name
      }
      state
      street
      street_number
      zipcode
    }
  }
`;

const GET_LIKED_PET = gql`
  query($id: ID!) {
    likedPet(id: $id) {
      id
      liked_at
      user {
        id
        first_name
        last_name
        email
        zipcode
        pet_age_preference
        pet_distance_preference
        pet_size_preference
        pet_type_preference
      }
      pet {
        id
        age
        coat
        declawed
        description
        good_with_children
        good_with_dogs
        good_with_cats
        house_trained
        is_mixed_breed
        is_unknown_breed
        name
        photos
        primary_breed
        primary_color
        secondary_breed
        secondary_color
        sex
        shots_are_current
        size
        spayed_or_neutered
        special_needs
        species_name
        status
        tertiary_color
      }
    }
  }
`;

const GET_LIKED_PETS = gql`
  query {
    likedPets {
      id
    }
  }
`;

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
  GET_CURRENT_USER,
  GET_LIKED_PET,
  GET_LIKED_PETS,
  GET_PET_BY_ID,
  GET_RANDOM_PET,
  GET_SHELTER,
  UNLIKE_PET,
  UPDATE_USER,
};
