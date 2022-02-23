const ERROR_MSG_1 = {
  status: 400,
  message: 'Código do item inválido ou não econtrado!',
};

const ERROR_MSG_2 = {
  status: 409,
  message: 'Email já registrado!',
};

const ERROR_MSG_3 = {
  status: 401,
  message: 'Email ou password incorreto!',
};

const ERROR_MSG_4 = {
  status: 401,
  message: 'Token de acesso não informado!',
};

const ERROR_MSG_5 = {
  status: 401,
  message: 'Token de acesso inválido!',
};

const ERROR_MSG_6 = {
  status: 401,
  message: 'Todos os campos devem ser informados corretamente! Tente novamente.',
};

const ERROR_MSG_7 = {
  status: 401,
  message: 'O formato do email é inválido! Tente novamente.',
};

const ERROR_MSG_8 = {
  status: 401,
  message: 'O password deve conter de 6 à 12 caracteres! Tente novamente.',
};

const ERROR_MSG_9 = {
  status: 403,
  message: 'Acesso negado!',
};

const ERROR_MSG_10 = {
  status: 401,
  message: 'Escolha entre as opções válidas: litro, kilo ou unidade.',
};

const ERROR_MSG_11 = {
  status: 401,
  message: 'Nenhum item encontrado para palavra-chave inserida.',
};

const ERROR_MSG_12 = {
  status: 400,
  message: 'Nenhum item atualizado/excluído.',
};

const ERROR_MSG_13 = {
  status: 400,
  message: 'Não há ingredientes suficientes para atender este pedido. Tente uma quantidade menor ou aumente os recursos em estoque.',
};

module.exports = {
  ERROR_MSG_1,
  ERROR_MSG_2,
  ERROR_MSG_3,
  ERROR_MSG_4,
  ERROR_MSG_5,
  ERROR_MSG_6,
  ERROR_MSG_7,
  ERROR_MSG_8,
  ERROR_MSG_9,
  ERROR_MSG_10,
  ERROR_MSG_11,
  ERROR_MSG_12,
  ERROR_MSG_13,
};
