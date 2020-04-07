/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const axios = require('axios');

const API_URL = 'https://api.petfinder.com';

const TOKEN_REQUEST_OBJECT = {
  method: 'post',
  url: `${API_URL}/v2/oauth2/token`,
  data: {
    grant_type: 'client_credentials',
    client_id: process.env.PETFINDER_KEY,
    client_secret: process.env.PETFINDER_SECRET,
  },
};

const PAGE_REQUEST_OBJECT = (token, page) => ({
  method: 'get',
  url: API_URL + page,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getToken = () => axios(TOKEN_REQUEST_OBJECT).then((response) => response.data.access_token).catch((err) => console.log('ERROR GETTING TOKEN:', err));

const getPetsPage = (token, page) => axios(PAGE_REQUEST_OBJECT(token, page))
  .then((response) => {
    let nextPage;
    if (response.data.pagination._links) {
      if (response.data.pagination._links.next) {
        nextPage = response.data.pagination._links.next.href;
      } else {
        nextPage = null;
      }
    }
    return {
      pets: response.data.animals,
      nextPage,
    };
  }).catch((err) => console.log('ERROR GETTING PET PAGE:', err));

const getSheltersPage = (token, page) => axios(PAGE_REQUEST_OBJECT(token, page))
  .then((response) => {
    let nextPage;
    if (response.data.pagination._links) {
      if (response.data.pagination._links.next) {
        nextPage = response.data.pagination._links.next.href;
      } else {
        nextPage = null;
      }
    }
    return {
      shelters: response.data.organizations,
      nextPage,
    };
  }).catch((err) => console.log('ERROR GETTING SHELTER:', err));

const getShelter = (token, shelterId) => {
  const page = `/v2/organizations/${shelterId}`;
  return axios(PAGE_REQUEST_OBJECT(token, page))
    .then((response) => (
      {
        shelters: [response.data.organization],
      }
    )).catch((err) => console.log('ERROR GETTING SHELTER:', err));
};

module.exports = {
  getToken,
  getPetsPage,
  getShelter,
  getSheltersPage,
};
