const cleanUpDb = require('./clean-up-db');
const closeDbConnection = require('./close-db-connection');
const getQuery = require('./get-query-token');

module.exports = {
  cleanUpDb,
  closeDbConnection,
  getQuery,
};
