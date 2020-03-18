const db = require('../index');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index');

afterEach(cleanUpDb);
afterAll(closeDbConnection);

const shelterDatum = {
    name: 'Bean-Town Pups and Kitties',        
    location: `{
      "city": "Boston",
      "state": "MA",
      "zip": "02144"
    }`,
    hours: `{
      "monday": "9-5",
      "tuesday": "9-5",
      "wednesday": "9-5",
      "thursday": "9-5",
      "friday": "9-5",
      "saturday": "9-5",
      "sunday": "9-5"
    }`,
    phone: '(617) 214 - 3131',
    email: 'BTPupsNKitties@BostonShelters.com',
    organization_id: 'A104',
};

const shelter2Datum = {
  name: 'Seattle Sky Shelter',
  location: `{
    "city": "Seattle",
    "state": "WA",
    "zip": "98115
  }`,
  hours: `{
    "monday": "6 - 2",
      "tuesday": "6 - 2",
      "wednesday": "6 - 2",
      "thursday": "6 - 2",
      "friday": "6 - 2",
      "saturday": "6 - 2",
      "sunday": "6 - 2"
    }`,
    phone: '(217) 314 - 9867',
    email: 'SkyShelter@SeattleShelters.com',
    organization_id: 'C912',
}

const shelterCreateWithNullValue = (valueToBeNull) => db.shelter.create(
  {
    ...shelterDatum,
    [valueToBeNull]: null,
  },
);

const shelterCreateWithSameValue = (valueToBeSame) => db.shelter.create(
  {
    ...shelter2Datum,
    [valueToBeSame]: shelterDatum[valueToBeSame]
  }
);

describe('Shelter Model', () => {
  describe('validations', () => {
    it('should require presence of organization_id', async () => {
      const fieldToTest = 'organization_id';
      await expect(shelterCreateWithNullValue(fieldToTest)).rejects.toThrow(`notNull Violation: shelter.${fieldToTest} cannot be null`);
    });
    it('should require presence of location', async () => {
      const fieldToTest = 'location';
      await expect(shelterCreateWithNullValue(fieldToTest)).rejects.toThrow(`notNull Violation: shelter.${fieldToTest} cannot be null`)
    });
    it('should not allow duplicate organization_ids', async () => {
      const toUpdate = 'organization_id';
      const validShelter = await db.shelter.create(shelterDatum);
      const invalidShelter = await shelterCreateWithSameValue(toUpdate).catch(({ name: errorName }) => errorName);

      expect(validShelter[toUpdate]).toBe(shelterDatum[toUpdate]);
      expect(invalidShelter).toBe('SequelizeUniqueConstraintError')
    });
    it('should not allow duplicate emails', async () => {
      const toUpdate = 'email';
      const validShelter = await db.shelter.create(shelterDatum);
      const invalidShelter = await shelterCreateWithSameValue(toUpdate).catch(({ name: errorName }) => errorName);

      expect(validShelter[toUpdate]).toBe(shelterDatum[toUpdate]);
      expect(invalidShelter).toBe('SequelizeUniqueConstraintError')
    });
    it('should not allow duplicate phone numbers', async () => {
      const toUpdate = 'phone';
      const validShelter = await db.shelter.create(shelterDatum);
      const invalidShelter = await shelterCreateWithSameValue(toUpdate).catch(({ name: errorName }) => errorName);

      expect(validShelter[toUpdate]).toBe(shelterDatum[toUpdate]);
      expect(invalidShelter).toBe('SequelizeUniqueConstraintError')
    });
  });
});
