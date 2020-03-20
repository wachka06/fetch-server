const db = require('../../models');
const cleanUpDb = done => {
  const tableNames = Object.values(db)
    .filter(model => !!model.tableName)
    .map(model => `"${model.tableName}"`);
  db.sequelize.query('TRUNCATE TABLE ' + tableNames.join(', ')).asCallback(done);
};
module.exports = cleanUpDb;

