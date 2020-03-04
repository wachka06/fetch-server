// Test data to load server
const books = [
  {
    title: 'Harry Potter and the Chamber of Sercrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
  },
];
const authors = [
  {
    name: 'J.K. Rowling',
    books: ['Harry Potter and the Chamber of Sercrets', 'Harry Potter and the Goblet of Fire'],
  },
  {
    name: 'Michael Crichton',
    books: ['Jurassic Park'],
  },
];
const resolvers = {
  // Test query to load server with
  Query: {
    books: () => books,
    authors: () => authors,
  },
};

module.exports = resolvers;
