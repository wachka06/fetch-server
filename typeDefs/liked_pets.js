const { gql } = require('apollo-server');

const likedPet = gql`
  scalar Date

  type LikedPet {
    id: ID!
    liked_at: Date
    user: User!
    pet: Pet!
    distance: Float
  }

  extend type Query {
    likedPet(id: ID!): LikedPet
    likedPets: [LikedPet]!
  }

  extend type Mutation {
    likePet(petId: ID!, isLiked: Boolean): LikedPet
    unlikePet(likedPetId: ID!): LikedPet
  }
`

module.exports = likedPet;
