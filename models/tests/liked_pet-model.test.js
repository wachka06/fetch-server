const db = require('../index');
const { cleanUpDb, closeDbConnection } = require('../../utils/test/index')

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

  const petDatum = {
    age: 'old',
    coat: 'long',
    declawed: false,
    description: 'A fun loving cuddler looking for a fur-ever place to leave his toys',
    good_with_children: true,
    good_with_dogs: true,
    good_with_cats: false,
    house_trained: true,
    is_mixed_breed: true,
    is_unknown_breed: false,
    name: 'Bogart',
    photos: ['https://www.photohub.com/bogartthebulldog'],
    primary_breed: 'French Bull Dog',
    primary_color: 'white',
    preference_one_value: 1,
    preference_two_value: 3,
    preference_three_value: 2,
    preference_four_value: 4,
    secondary_breed: 'boxer',
    secondary_color: 'brown',
    sex: 'male',
    shots_are_current: true,
    size: 'small',
    spayed_or_neutered: true,
    special_needs: false,
    species_name: 'dog',
    status: 'available',
    tertiary_color: 'black',
  }

  const likedPetDatum = {
      liked_at: Date()
  }

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

            await expect(`User ID is: ${likedPetInstance.user_id} and Pet ID is: ${likedPetInstance.pet_id}`).toBe(`User ID is: ${user.id} and Pet ID is: ${pet.id}`)
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