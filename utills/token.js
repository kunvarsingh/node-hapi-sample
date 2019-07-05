
'use strict';

const jwt = require('jsonwebtoken');
const config = require('./config');

var createToken = (user)=>{
  let scopes;
  // if (user.admin) {
  //   scopes = 'admin';
  // }

  return jwt.sign({ id: user._id,scope: 'user' }, config.key, { algorithm: 'HS256', expiresIn: "1h" } );
}

module.exports = {
	createToken : createToken
};
