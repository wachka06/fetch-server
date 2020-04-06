const createPetFilter = (userProfile) => {
  const filter = {};

  const buildFilterArr = [
    ['age', userProfile.pet_age_preference],
    ['good_with_cats', userProfile.good_with_cats],
    ['good_with_children', userProfile.good_with_children],
    ['good_with_dogs', userProfile.good_with_dogs],
    ['pet_activity_value', userProfile.pet_activity_preference],
    ['pet_dependency_value', userProfile.pet_dependency_preference],
    ['pet_social_value', userProfile.pet_social_preference],
    ['pet_trainability_value', userProfile.pet_trainability_preference],
    ['recommended_experience_level', userProfile.pet_experience_level],
    ['size', userProfile.pet_size_preference],
    ['species_name', userProfile.pet_type_preference],
  ];

  buildFilterArr.map((filterPair) => {
    filterPair[1] ? (filter[filterPair[0]] = filterPair[1]) : null;
  });

  return filter;
};

module.exports = createPetFilter;
