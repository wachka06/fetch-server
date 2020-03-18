module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('shelters', {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      unique: true,
      type: Sequelize.UUID,
    },
    location: {
      allowNull: false,
      type: Sequelize.JSONB,
    },
    name: {
      type: Sequelize.STRING
    },
    hours: {
      type: Sequelize.JSONB
    },
    phone: {  
      type: Sequelize.STRING,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    organization_id: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('shelters'),
};