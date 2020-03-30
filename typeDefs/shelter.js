const { gql } = require('apollo-server');

const shelter = gql`
    type Shelter {
        id: ID!
        name: String
    }
`

module.exports = shelter;