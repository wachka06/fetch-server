const mutations = require('./mutations');
const queries = require('./queries');
const dayjs = require('dayjs');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');


const resolvers = {
  Query: queries,
  Mutation: mutations,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return dayjs(value);
    },
    serialize(value) {
      return dayjs(value).format('MM-DD-YYYY');
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return dayjs(ast.value);
      }
      return null;
    },
  }),
};

module.exports = resolvers;
