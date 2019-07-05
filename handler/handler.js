const _service = require('../services/index');
const users = require('../models/users');
const token = require('../utills/token');




var login = async(req, res) =>{
	let username = req.payload.username;
	let password = req.payload.password;

	let data =  await users.findOne({UserName:username});
	if(!data) return res.response({message:'no data found!'}).code(404);
	else return res.response({token:token.createToken(data),data:data}).code(200);
}


var registration = async(req, res) =>{
	let user =  await users.findOne({Email : req.payload.Email});
	if(!user){
		let data =  await users.create(req.payload);
		data['message']="registration is successful";
		return res.response(data).code(200)
	}else{
		return res.response({message:'user is already exists'}).code(200)
	}
}


var getUserById = async(req, res) =>{
	let user =  await users.findOne({_id : req.params.id});
	if(!user){
		return res.response({message:'user is not found'}).code(404)
	}else{
		user['message']="user found successful";
		return res.response(user).code(200)
	}
}




module.exports={
	login       : login,
	registration: registration,
	getUserById : getUserById
}