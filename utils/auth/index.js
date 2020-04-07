const { OAuth2Client } = require('google-auth-library');
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const idTokenIsValid = async (idToken, clientId) => {
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: clientId,
  }).catch((error) => error);
  if (ticket instanceof Error) throw new AuthenticationError('idToken is invalid.');
  return ticket.payload;
};

const encodedJWT = (userId) => jwt.sign(userId, process.env.SECRET);

const decodedJWT = (token) => jwt.verify(token, process.env.SECRET, (error, result) => {
  if (error) throw new AuthenticationError('authorization token is invalid.');
  return result;
});

module.exports = {
  decodedJWT,
  encodedJWT,
  idTokenIsValid,
};
