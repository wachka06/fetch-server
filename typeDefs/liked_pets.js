const { gql } = require('apollo-server');

const likedPet = gql`
  scalar Date

  type LikedPet {
    id: ID!
    liked_at: Date
    user: User!
    pet: Pet!
  }

  extend type Query {
    likedPet(id: ID!): LikedPet
    likedPets: [LikedPet]!
  }
`

module.exports = likedPet;
