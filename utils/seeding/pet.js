const petfinder = require('../../services/petfinderApi');
const enums = require('../../sharedConstants/petPreferenceEnumsV2');

const NUM_OF_OPTIONS = 3;

const randomOption = (options) => options[Math.floor(Math.random() * NUM_OF_OPTIONS)];

const determineAge = (age) => {
  switch (age) {
    case 'baby':
    case 'young':
      return enums.PET_AGE[0];
    case 'adult':
      return enums.PET_AGE[1];
    case 'senior':
      return enums.PET_AGE[2];
    default:
      return randomOption(enums.PET_AGE);
  }
};

const determineSize = (size) => {
  switch (size) {
    case 'small':
      return enums.PET_AGE[0];
    case 'medium':
      return enums.PET_AGE[1];
    case 'large':
    case 'xlarge':
      return enums.PET_AGE[2];
    default:
      return randomOption(enums.PET_SIZE);
  }
};

const determineType = (type) => {
  switch (type.toLowerCase()) {
    case 'dog':
      return enums.PET_TYPE[0];
    case 'cat':
      return enums.PET_TYPE[1];
    default:
      return enums.PET_TYPE[2];
  }
};

const randomBoolean = () => Math.random() < 0.5;

const getPhoto = (photos) => {
  if (photos.length > 1) {
    return [photos[0].full];
  }
  return null;
};

const formatPet = (pet) => ({
  age: determineAge(pet.age),
  coat: pet.coat,
  createdAt: new Date(),
  description: pet.description,
  declawed: pet.attributes.declawed,
  good_with_cats: randomBoolean(),
  good_with_children: randomBoolean(),
  good_with_dogs: randomBoolean(),
  house_trained: pet.attributes.house_trained,
  is_mixed_breed: pet.breeds.mixed,
  is_unknown_breed: pet.breeds.unknown,
  name: pet.name,
  photos: getPhoto(pet.photos),
  pet_activity_value: randomOption(enums.PET_ACTIVITY),
  pet_dependency_value: randomOption(enums.PET_DEPENDENCY),
  pet_trainability_value: randomOption(enums.PET_TRAINABILITY),
  pet_social_value: randomOption(enums.PET_SOCIABILITY),
  primary_breed: pet.breeds.primary,
  primary_color: pet.colors.primary || 'NA',
  recommended_experience_level: randomOption(enums.PET_EXPERIENCE_LEVEL),
  secondary_breed: pet.breeds.secondary,
  secondary_color: pet.colors.secondary,
  sex: enums.PET_SEX[Math.floor(Math.random() * 2)],
  shelter_id: pet.organization_id,
  shots_are_current: pet.attributes.shots_current,
  size: determineSize(pet.size),
  spayed_or_neutered: pet.attributes.spayed_neutered,
  special_needs: pet.attributes.special_needs,
  species_name: determineType(pet.species),
  status: enums.PET_STATUS[0],
  tertiary_color: pet.colors.tertiary,
  updatedAt: new Date(),
});

const getPetsPageFromAPI = async (token, page) => {
  const data = await petfinder.getPetsPage(token, page);
  const pets = await data.pets.filter((pet) => {
    const species = pet.species.toLowerCase();
    if (species === 'dog' || species === 'cat') {
      return true;
    }
    return false;
  });
  const formattedPets = pets.map((pet) => formatPet(pet));
  if (data.nextPage) {
    const nextFormattedPets = await getPetsPageFromAPI(token, data.next);
    return formattedPets.concat(nextFormattedPets);
  }
  return formattedPets;
};

const getPetsFromShelter = async (token, shelterId) => {
  const page = `/v2/animals?limit=100&organization=${shelterId}`;
  return getPetsPageFromAPI(token, page);
};

module.exports = {
  formatPet,
  getPetsPageFromAPI,
  getPetsFromShelter,
};
