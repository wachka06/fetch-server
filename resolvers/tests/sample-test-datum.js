const userDatum = {
  email: 'gtoledo342@gmail.com',
  first_name: 'Gabe',
  last_name: 'Toledo',
  zipcode: '98104',
  pet_distance_preference: 10,
  pet_age_preference: 'YOUNG',
  pet_size_preference: 'SMALL',
  pet_type_preference: 'DOG',
};

const shelterDatum = {
  name: 'Bean-Town Pups and Kitties',
  street_number: '10',
  street: 'Chandler Street',
  city: 'Boston',
  state: 'MA',
  zipcode: '02144',
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
  pet_finder_id: 'A104',
};

const shelter2Datum = {
  name: 'Seattle Sky Shelter',
  street_number: '13212',
  street: 'SE Eastgate Way',
  city: 'Bellevue',
  state: 'WA',
  zipcode: '98115',
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
  pet_finder_id: 'C912',
};

const petDatum = {
  age: 'SENIOR',
  coat: 'long',
  declawed: false,
  description:
    'A fun loving cuddler looking for a fur-ever place to leave his toys',
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
  sex: 'MALE',
  shots_are_current: true,
  size: 'SMALL',
  spayed_or_neutered: true,
  special_needs: false,
  species_name: 'DOG',
  status: 'NOT_ADOPTED',
  tertiary_color: 'black',
};

const likedPetDatum = {
  liked_at: Date(),
};

module.exports = {
  petDatum,
  userDatum,
  shelterDatum,
  shelter2Datum,
  likedPetDatum,
};
