const _handler = require('../handler/handler');
const Joi = require('@hapi/joi');




module.exports = (server) => {
  return [
    {
      method:'POST',
      path : '/login',
      handler :_handler.login,
      config: { auth: false },
    },
     {
      method: 'POST',
      path: '/registration',
      handler: _handler.registration,
      config: { auth: false },
    },
     {
      method: 'GET',
      path: '/getUserById/{id}',
      handler: _handler.getUserById,
      config: { auth: 'jwt' },
    },
  ]
}