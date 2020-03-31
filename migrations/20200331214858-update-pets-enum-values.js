const petPreferenceEnumsV2 = require('./../sharedConstants/petPreferenceEnumsV2');
const petPreferenceEnums = require('./../sharedConstants/petPreferenceEnumsV1');
const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      replaceEnum({
        tableName: 'pets',
        columnName: 'age',
        enumName: 'enum_pets_age',
        newValues: petPreferenceEnumsV2.PET_AGE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'size',
        enumName: 'enum_pets_size',
        newValues: petPreferenceEnumsV2.PET_SIZE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'species_name',
        enumName: 'enum_pets_species_name',
        newValues: petPreferenceEnumsV2.PET_TYPE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'pet_dependency_value',
        enumName: 'enum_pets_pet_dependency_value',
        newValues: petPreferenceEnumsV2.PET_DEPENDENCY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'pet_activity_value',
        enumName: 'enum_pets_pet_activity_value',
        newValues: petPreferenceEnumsV2.PET_ACTIVITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'pet_trainability_value',
        enumName: 'enum_pets_pet_trainability_value',
        newValues: petPreferenceEnumsV2.PET_TRAINABILITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'pet_social_value',
        enumName: 'enum_pets_pet_social_value',
        newValues: petPreferenceEnumsV2.PET_SOCIABILITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'sex',
        enumName: 'enum_pets_sex',
        newValues: petPreferenceEnumsV2.PET_SEX,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'recommended_experience_level',
        enumName: 'enum_pets_recommended_experience_level',
        newValues: petPreferenceEnumsV2.PET_EXPERIENCE_LEVEL,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'status',
        enumName: 'enum_pets_status',
        newValues: petPreferenceEnumsV2.PET_STATUS,
        queryInterface,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      replaceEnum({
        tableName: 'pets',
        columnName: 'age',
        enumName: 'enum_pets_age',
        newValues: petPreferenceEnums.AGE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'size',
        enumName: 'enum_pets_size',
        newValues: petPreferenceEnums.SIZE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'species_name',
        enumName: 'enum_pets_species_name',
        newValues: petPreferenceEnums.TYPE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'pet_dependency_value',
        enumName: 'enum_pets_pet_dependency_value',
        newValues: petPreferenceEnums.DEPENDENCY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'pet_activity_value',
        enumName: 'enum_pets_pet_activity_value',
        newValues: petPreferenceEnums.ACTIVITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'pet_trainability_value',
        enumName: 'enum_pets_pet_trainability_value',
        newValues: petPreferenceEnums.TRAINABILITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'pet_social_value',
        enumName: 'enum_pets_pet_social_value',
        newValues: petPreferenceEnums.SOCIAL,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'sex',
        enumName: 'enum_pets_sex',
        newValues: petPreferenceEnums.SEX,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'recommended_experience_level',
        enumName: 'enum_pets_recommended_experience_level',
        newValues: petPreferenceEnums.EXPERIENCE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'pets',
        columnName: 'status',
        enumName: 'enum_pets_status',
        newValues: petPreferenceEnums.STATUS,
        queryInterface,
      }),
    ]);
  },
};
