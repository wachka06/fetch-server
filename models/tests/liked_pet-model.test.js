const db = require('../index');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index')
const { userDatum, shelterDatum, petDatum, likedPetDatum } = require('./sample-test-datum.js')

afterEach(cleanUpDb);
afterAll(closeDbConnection);

describe('Liked Pets Model', () => {
    describe('Association Validations', () => {
        it('should require presense of a user_id and pet_id', async () => {
            const user = await db.user.create(userDatum)
            const shelter = await db.shelter.create(shelterDatum)
            const pet = await db.pet.create({
                ...petDatum,
                shelter_id: shelter.id
            })
            const likedPetInstance = await db.liked_pet.create({
                ...likedPetDatum,
                user_id: user.id,
                pet_id: pet.id
            })

            await expect(likedPetInstance.user_id).toBe(user.id)
            await expect(likedPetInstance.pet_id).toBe(pet.id)
        })
        it('should require an active user_id from the users table', async() => {
            const user = await db.user.create(userDatum)
            const shelter = await db.shelter.create(shelterDatum)
            const pet = await db.pet.create({
                ...petDatum,
                shelter_id: shelter.id
            })
            await expect(db.liked_pet.create({
                ...likedPetDatum,
                user_id: pet.id,
                pet_id: pet.id
            })).rejects.toThrow(`insert or update on table \"liked_pets\" violates foreign key constraint \"liked_pets_user_id_fkey\"`)
        })
        it('should require an active pet_id from the pets table', async() => {
            const user = await db.user.create(userDatum)
            const shelter = await db.shelter.create(shelterDatum)
            const pet = await db.pet.create({
                ...petDatum,
                shelter_id: shelter.id
            })
            await expect(db.liked_pet.create({
                ...likedPetDatum,
                user_id: user.id,
                pet_id: user.id
            })).rejects.toThrow(`insert or update on table \"liked_pets\" violates foreign key constraint \"liked_pets_pet_id_fkey\"`)
        })
    })
})