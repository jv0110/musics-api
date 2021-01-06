const users_model = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.get_user = async (req, res) => {
  try{
    const users = await users_model.get_users();
    if(!users.length) return res.status(404).json("No users found");
    return res.status(200).json(users);
  }catch(err){
    console.log(err);
  }
}
exports.new_user = async (req, res) => {
  const data = {
    ...req.body,
    createdAt: new Date()
  }
  try{
    const user_exists = await users_model.find_by_email(data.user_email);
    if(user_exists.length) return res.status(403).json("User already exists");
    
    const salt = bcrypt.genSaltSync(11);
    if(!salt) return res.status(500).json("Could not create user. Smoething went wrong with the password");
    
    const hash = bcrypt.hashSync(data.user_password, salt);
    if(!hash) return res.status(500).json("Could not create user. Smoething went wrong with the password");

    data.user_password = hash;
    const create_user = await users_model.new_user(data);
    if(!create_user) return res.status(500).json("Error on creating the new user");

    return res.status(200).json(create_user);
  }catch(err){
    console.log(err);
  }
}
exports.sign_in = async (req, res) => {
  const data = {
    ...req.body
  }
  try{
    const user = await users_model.sign_in(data.user_email);
    if(!user.length) return res.status(404).json("No user found");

    const val_password = bcrypt.compareSync(data.user_password, user[0].user_password);
    if(!val_password) return res.status(400).json("Wrong password...");

    const access_token = await jwt.sign({
      user_id: user[0].user_id,
      role: user[0].role
    }, process.env.JWT_SECRET, { expiresIn: '2h'});
    if(!access_token) return res.status(403).json("Error on granting the access");

    return res.status(200).json(access_token);
  }catch(err){
    console.log(err);
  }
}
exports.delete_user = async (req, res) => {
  const { user_email } = req.body;
  try{
    const user = await users_model.find_by_email(user_email);
    if(!user.length) return res.status(404).json("No users found");

    const user_del = await users_model.delete_user(user[0].user_id);
    if(!user_del) return res.status(404).json("No user found");
    return res.status(200).json("User deleted");
  }catch(err){
    console.log(err);
  }
}
exports.update_user = async (req, res) => {
  const user_email = req.body.user_email;
  const data = {
    ...req.body.new,
    createdAt: new Date()
  }
  try{
    const user = await users_model.find_by_email(user_email);
    if(!user.length) return res.status(404).json("No user found");

    const user_id = user[0].user_id;
    const update = await users_model.update_user(user_id, data);
    if(!update) return res.status(500).json("Error updating user");

    return res.status(200).json("User updated");
  }catch(err){
    console.log(err);
  }
}