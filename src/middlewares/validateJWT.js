const authService = require('./authService');

const ERROR_MSG_1 = {
  status: 401,
  message: 'Token de acesso não informado',
};

const ERROR_MSG_2 = {
  status: 401,
  message: 'Token de acesso inválido',
};

const validateJWT = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw ERROR_MSG_1;

    const user = authService.verifyToken(authorization);
    if (!user) throw ERROR_MSG_2;

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = validateJWT;
