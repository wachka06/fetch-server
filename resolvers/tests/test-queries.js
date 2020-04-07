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

module.exports = {
  GET_CURRENT_USER,
  GET_SHELTER,
  GET_PET_BY_ID,
  GET_RANDOM_PET,
};
