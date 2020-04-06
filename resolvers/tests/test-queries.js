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
  query($id: ID!){
    getShelter(id: $id){
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
  GET_PET_BY_ID,
  GET_CURRENT_USER,
  GET_SHELTER,
};
