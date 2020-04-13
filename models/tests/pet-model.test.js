const db = require('../index');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index');
const { shelterDatum, petDatum } = require('./sample-test-datum.js');

afterEach(cleanUpDb);
afterAll(closeDbConnection);

const petCreateWithBadShelterId = () =>
  db.pet.create({
    ...petDatum,
    shelter_id: 'f52eefdd-4291-40f9-896c-d17c0b12d916',
  });

const petCreateWithNullShelter = (valueToNull) =>
  db.pet.create({
    ...petDatum,
    [valueToNull]: null,
  });

const petCreateWithNullValue = (shelter, valueToNull) =>
  db.pet.create({
    ...petDatum,
    shelter_id: shelter.id,
    [valueToNull]: null,
  });

describe('Pet Model', () => {
  describe('Association Validations', () => {
    it('should require presence of shelter_id', async () => {
      const fieldToTest = 'shelter_id';
      await expect(petCreateWithNullShelter(fieldToTest)).rejects.toThrow(
        `notNull Violation: pet.${fieldToTest} cannot be null`
      );
    });
    it('should throw an error if shelter_id is not an existing shelter_id', async () => {
      await expect(petCreateWithBadShelterId()).rejects.toThrow(
        `insert or update on table \"pets\" violates foreign key constraint \"pets_shelter_id_fkey\"`
      );
    });
    it('should save same shelter_id as parent shelter', async () => {
      const shelter = await db.shelter.create(shelterDatum);
      const pet = await db.pet.create({
        ...petDatum,
        shelter_id: shelter.id,
      });
      await expect(pet.shelter_id).toBe(shelter.id);
    });
  }),
    describe('Standard Validations', () => {
      it('should require a age to be present', async () => {
        const valueToNull = 'age';
        const shelter = await db.shelter.create(shelterDatum);
        await expect(
          petCreateWithNullValue(shelter, valueToNull)
        ).rejects.toThrow(
          `notNull Violation: pet.${valueToNull} cannot be null`
        );
      });
      it('should require a flag for unknown breed to be present', async () => {
        const valueToNull = 'is_unknown_breed';
        const shelter = await db.shelter.create(shelterDatum);
        await expect(
          petCreateWithNullValue(shelter, valueToNull)
        ).rejects.toThrow(
          `notNull Violation: pet.${valueToNull} cannot be null`
        );
      });
      it('should require a name to be present', async () => {
        const valueToNull = 'name';
        const shelter = await db.shelter.create(shelterDatum);
        await expect(
          petCreateWithNullValue(shelter, valueToNull)
        ).rejects.toThrow(
          `null value in column \"${valueToNull}\" violates not-null constraint`
        );
      });
      it('should require a primary color to be present', async () => {
        const valueToNull = 'primary_color';
        const shelter = await db.shelter.create(shelterDatum);
        await expect(
          petCreateWithNullValue(shelter, valueToNull)
        ).rejects.toThrow(
          `notNull Violation: pet.${valueToNull} cannot be null`
        );
      });
      it('should require a gender to be present', async () => {
        const valueToNull = 'sex';
        const shelter = await db.shelter.create(shelterDatum);
        await expect(
          petCreateWithNullValue(shelter, valueToNull)
        ).rejects.toThrow(
          `notNull Violation: pet.${valueToNull} cannot be null`
        );
      });
      it('should require a size to be present', async () => {
        const valueToNull = 'size';
        const shelter = await db.shelter.create(shelterDatum);
        await expect(
          petCreateWithNullValue(shelter, valueToNull)
        ).rejects.toThrow(
          `notNull Violation: pet.${valueToNull} cannot be null`
        );
      });
      it('should require a status to be present', async () => {
        const valueToNull = 'status';
        const shelter = await db.shelter.create(shelterDatum);
        await expect(
          petCreateWithNullValue(shelter, valueToNull)
        ).rejects.toThrow(
          `notNull Violation: pet.${valueToNull} cannot be null`
        );
      });
    });
});
