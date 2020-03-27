/* eslint-disable no-undef */
const auth = require('../index');
require('dotenv').config();

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
};

describe('auth', () => {
  it('should be able to encode and decode the user data', () => {
    const encodedJWTObject = auth.encodedJWT(userDatum);
    const decodedJWTObject = auth.decodedJWT(encodedJWTObject);
    expect(decodedJWTObject.email).toBe(userDatum.email);
  });
});
