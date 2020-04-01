const db = require('../index');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index');
const { shelterDatum, shelter2Datum } = require('./sample-test-datum.js');

afterEach(cleanUpDb);
afterAll(closeDbConnection);

const shelterCreateWithNullValue = (valueToBeNull) =>
  db.shelter.create({
    ...shelterDatum,
    [valueToBeNull]: null,
  });

const shelterCreateWithSameValue = (valueToBeSame) =>
  db.shelter.create({
    ...shelter2Datum,
    [valueToBeSame]: shelterDatum[valueToBeSame],
  });

describe('Shelter Model', () => {
  describe('validations', () => {
    it('should require presence of pet_finder_id', async () => {
      const fieldToTest = 'pet_finder_id';
      await expect(shelterCreateWithNullValue(fieldToTest)).rejects.toThrow(
        `notNull Violation: shelter.${fieldToTest} cannot be null`
      );
    });
    it('should require presence of zipcode', async () => {
      const fieldToTest = 'zipcode';
      await expect(shelterCreateWithNullValue(fieldToTest)).rejects.toThrow(
        `notNull Violation: shelter.${fieldToTest} cannot be null`
      );
    });
    it('should not allow duplicate pet_finder_id', async () => {
      const toUpdate = 'pet_finder_id';
      const validShelter = await db.shelter.create(shelterDatum);
      const invalidShelter = await shelterCreateWithSameValue(toUpdate).catch(
        ({ name: errorName }) => errorName
      );

      expect(validShelter[toUpdate]).toBe(shelterDatum[toUpdate]);
      expect(invalidShelter).toBe('SequelizeUniqueConstraintError');
    });
    it('should not allow duplicate emails', async () => {
      const toUpdate = 'email';
      const validShelter = await db.shelter.create(shelterDatum);
      const invalidShelter = await shelterCreateWithSameValue(toUpdate).catch(
        ({ name: errorName }) => errorName
      );

      expect(validShelter[toUpdate]).toBe(shelterDatum[toUpdate]);
      expect(invalidShelter).toBe('SequelizeUniqueConstraintError');
    });
    it('should not allow duplicate phone numbers', async () => {
      const toUpdate = 'phone';
      const validShelter = await db.shelter.create(shelterDatum);
      const invalidShelter = await shelterCreateWithSameValue(toUpdate).catch(
        ({ name: errorName }) => errorName
      );

      expect(validShelter[toUpdate]).toBe(shelterDatum[toUpdate]);
      expect(invalidShelter).toBe('SequelizeUniqueConstraintError');
    });
    it('should have valid latitude and longitude fields', async () => {
      const shelter = await db.shelter.create(shelter2Datum);
      expect(shelter.latitude).toBeDefined();
      expect(shelter.longitude).toBeDefined();
    });
  });
});
