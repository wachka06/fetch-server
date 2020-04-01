const petPreferenceEnumsV2 = require('./../sharedConstants/petPreferenceEnumsV2');
const petPreferenceEnums = require('./../sharedConstants/petPreferenceEnumsV1');
const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_age_preference',
        enumName: 'enum_users_pet_age_preference',
        newValues: petPreferenceEnumsV2.PET_AGE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_size_preference',
        enumName: 'enum_users_pet_size_preference',
        newValues: petPreferenceEnumsV2.PET_SIZE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_type_preference',
        enumName: 'enum_users_pet_type_preference',
        newValues: petPreferenceEnumsV2.PET_TYPE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_dependency_preference',
        enumName: 'enum_users_pet_dependencey_preference',
        newValues: petPreferenceEnumsV2.PET_DEPENDENCY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_activity_preference',
        enumName: 'enum_users_pet_activity_preference',
        newValues: petPreferenceEnumsV2.PET_ACTIVITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_trainability_preference',
        enumName: 'enum_users_pet_trainability_preference',
        newValues: petPreferenceEnumsV2.PET_TRAINABILITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_social_preference',
        enumName: 'enum_users_pet_social_preference',
        newValues: petPreferenceEnumsV2.PET_SOCIABILITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_sex_preference',
        enumName: 'enum_users_pet_sex_preference',
        newValues: petPreferenceEnumsV2.PET_SEX,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_experience_level',
        enumName: 'enum_users_pet_experience_level',
        newValues: petPreferenceEnumsV2.PET_EXPERIENCE_LEVEL,
        queryInterface,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_age_preference',
        enumName: 'enum_users_pet_age_preference',
        newValues: petPreferenceEnums.AGE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_size_preference',
        enumName: 'enum_users_pet_size_preference',
        newValues: petPreferenceEnums.SIZE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_type_preference',
        enumName: 'enum_users_pet_type_preference',
        newValues: petPreferenceEnums.TYPE,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_dependency_preference',
        enumName: 'enum_users_pet_dependencey_preference',
        newValues: petPreferenceEnums.DEPENDENCY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_activity_preference',
        enumName: 'enum_users_pet_activity_preference',
        newValues: petPreferenceEnums.ACTIVITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_trainability_preference',
        enumName: 'enum_users_pet_trainability_preference',
        newValues: petPreferenceEnums.TRAINABILITY,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_social_preference',
        enumName: 'enum_users_pet_social_preference',
        newValues: petPreferenceEnums.SOCIAL,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_sex_preference',
        enumName: 'enum_users_pet_sex_preference',
        newValues: petPreferenceEnums.SEX,
        queryInterface,
      }),
      replaceEnum({
        tableName: 'users',
        columnName: 'pet_experience_level',
        enumName: 'enum_users_pet_experience_level',
        newValues: petPreferenceEnums.EXPERIENCE,
        queryInterface,
      }),
    ]);
  },
};
