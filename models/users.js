const db = require('../database/database');

exports.get_users = async () => {
  try{
    return await db
    .select(['user_id', 'user_name', 'user_email'])
    .from('users'); 
  }catch(err){
    console.log("DB error(users table): ", err);
  }
}
exports.find_by_email = async (user_email) => {
  try{
    return await db
    .select(['user_id', 'user_email'])
    .from('users')
    .where({ user_email });
  }catch(err){
    console.log("DB error(users table): ", err);
  }
}
exports.new_user = async (data) => {
  try{
    return await db
    .insert(data)
    .into('users');
  }catch(err){
    console.log("DB error(users table): ", err);
  }
}
exports.sign_in = async (user_email) => {
  try{
    return await db
    .select(['user_id', 'user_email', 'user_password', 'role'])
    .from('users')
    .where({ user_email });
  }catch(err){
    console.log("DB error(users table): ", err);
  }
} 
exports.delete_user = async (user_id) => {
  try{
    if(isNaN(user_id)){
      return await db
      .table('users')
      .where({ email: user_id })
      .del();
    }else{
    return await db
      .table('users')
      .where({ user_id })
      .del();
    }
  }catch(err){
    console.log("DB error(users table): ", err);
  }
}
exports.update_user = async (user_id, data) => {
  try{
    return await db
    .table('users')
    .update(data)
    .where({ user_id });
  }catch(err){
    console.log("DB error(users table): ", err);
  }
}