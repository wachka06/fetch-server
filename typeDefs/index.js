const { gql } = require('apollo-server');

// Test types to load server with
const typeDefs = gql`
type Book {
    title: String
    author: Author
}
type Author {
    name: String
    books: [Book]
}
type Query {
    books: [Book]
    authors: [Author]
}`;

module.exports = typeDefs;
