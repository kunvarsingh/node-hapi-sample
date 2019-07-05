'use strict';
const Hapi = require('@hapi/hapi');
const mongoose  = require('mongoose');


const config = require('./utills/config');
const Route = require('./route/index');


// MongoDB connection start---------------------------------------------------
mongoose.connect('mongodb://localhost:27017/pancharwala', function(data,err){
	if(!err) console.log("Error to connect MONGODB :",err);
	console.log("MONGODB connection successfully");
});
// -----------------------END-------------------------------------------------


// bring your own validation function
const validate = async function (decoded, request) {
  // console.log(decoded,typeof(decoded),decoded.id)
  if(decoded.id){
    return { isValid: true };
  }else{
     return { isValid: false };
  }
};


// ------------------------SERVER creation----------------------------------
const init = async () => {
    const server = Hapi.server({
        port: config.PORT,
        host: 'localhost'
    });
  
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt',
    { key: config.key,                           // Never Share your secret key
      validate: validate,                        // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    });
    server.auth.default('jwt');


    server.route(Route(server));
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// -----------------------END------------------------------------------------


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
