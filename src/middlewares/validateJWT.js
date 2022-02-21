const { verifyToken } = require('../services/authService');
const { ERROR_MSG_4, ERROR_MSG_5 } = require('../utils/errorMessages');

const validateJWT = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw ERROR_MSG_4;

    const user = verifyToken(authorization);
    if (!user) throw ERROR_MSG_5;

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = validateJWT;
