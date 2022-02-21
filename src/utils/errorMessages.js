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

module.exports = {
  ERROR_MSG_1,
  ERROR_MSG_2,
  ERROR_MSG_3,
};
