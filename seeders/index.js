/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const TOKEN_REQUEST_OBJECT = {
  method: 'post',
  url: 'https://api.petfinder.com/v2/oauth2/',
  data: {
    grant_type: 'client_credentials',
    client_id: process.env.KEY,
    client_secret: process.env.SECRET,
  },
};

// eslint-disable-next-line arrow-body-style
const ANIMALS_REQUEST_OBJECT = (token, page) => {
  return {
    method: 'get',
    url: `https://api.petfinder.com${page}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getToken = () => axios(TOKEN_REQUEST_OBJECT).then((response) => response.data.access_token);

// const writeData = (animals) => {

// }

const getAnimalPage = (token, page) => axios(ANIMALS_REQUEST_OBJECT(token, page)).then((response) => {
  // writeData(response.data.animals);
  return response.data.pagination._links.href;
});

const getAllAnimals = async () => {
  const token = await getToken();
  let page = '/v2/animals';
  const loop = setInterval(async () => {
    const nextPage = await getAnimalPage(token, page);
    if (nextPage) {
      page = nextPage;
    } else {
      clearInterval(loop);
    }
  }, 1000);
};

getAllAnimals();
