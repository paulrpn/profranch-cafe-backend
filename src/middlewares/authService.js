const jwt = require('jsonwebtoken');

const { API_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (userData) => (jwt.sign({ ...userData }, API_SECRET, JWT_CONFIG));

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);

    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
