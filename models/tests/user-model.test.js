/* eslint-disable no-undef */

const db = require('../index');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index');

afterEach(cleanUpDb);
afterAll(closeDbConnection);

const userDatum = {
  email: 'gtoledo342@gmail.com',
  first_name: 'Gabe',
  last_name: 'Toledo',
  location: {
    streetNumber: '925',
    street: 'Cherry Street',
    city: 'Seattle',
    state: 'WA',
    postcode: '98104',
  },
  pet_distance_preference: 10,
  pet_age_preference: 'young',
  pet_size_preference: 'small',
  pet_type_preference: 'dog',
  pet_preference_one: 0,
  pet_preference_two: 0,
  pet_preference_three: 0,
  pet_preference_four: 0,
};

const userCreateWithNullValue = (valueToBeNull) => db.user.create(
  {
    ...userDatum,
    [valueToBeNull]: null,
  },
);


describe('User Model', () => {
  describe('validations', () => {
    it('should require presence of first_name', async () => {
      const fieldToTest = 'first_name';
      await expect(userCreateWithNullValue(fieldToTest)).rejects.toThrow(`notNull Violation: user.${fieldToTest} cannot be null`);
    });
    it('should require presence of last_name', async () => {
      const fieldToTest = 'last_name';
      await expect(userCreateWithNullValue('last_name')).rejects.toThrow(`notNull Violation: user.${fieldToTest} cannot be null`);
    });
    it('should require presence of email', async () => {
      const fieldToTest = 'email';
      await expect(userCreateWithNullValue('email')).rejects.toThrow(`notNull Violation: user.${fieldToTest} cannot be null`);
    });
    it('should not allow duplicate emails', async () => {
      const validUser = await db.user.create(userDatum);
      const invalidUser = await db.user.create(userDatum).catch(({ name: errorName }) => errorName);

      expect(validUser.email).toBe(userDatum.email);
      expect(invalidUser).toBe('SequelizeUniqueConstraintError');
    });
  });
});
