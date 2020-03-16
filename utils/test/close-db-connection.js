// https://source.digital.accenture.com/projects/INT/repos/graphql-node-testing-workshop/browse/utils/test/close-db-connection.js?at=spring20

const db = require('../../models');

const closeDbConnection = () => db.sequelize.close();

module.exports = closeDbConnection;
