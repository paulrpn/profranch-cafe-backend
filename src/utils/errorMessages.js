const ERROR_MSG_1 = {
  status: 400,
  message: 'Código do ingrediente inválido ou não econtrado!',
};

const ERROR_MSG_2 = {
  status: 409,
  message: 'Email já registrado!',
};

const ERROR_MSG_3 = {
  status: 401,
  message: 'Username ou password incorreto!',
};

const ERROR_MSG_4 = {
  status: 401,
  message: 'Token de acesso não informado',
};

const ERROR_MSG_5 = {
  status: 401,
  message: 'Token de acesso inválido',
};

module.exports = {
  ERROR_MSG_1,
  ERROR_MSG_2,
  ERROR_MSG_3,
  ERROR_MSG_4,
  ERROR_MSG_5,
};
