const JWT = require('jsonwebtoken');

const { API_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (userData) => (JWT.sign({ ...userData }, API_SECRET, JWT_CONFIG));

const verifyToken = (token) => {
  try {
    const decoded = JWT.verify(token, API_SECRET);

    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
