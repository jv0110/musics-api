const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if(!req.headers.authorization) return res.status(404).json("No access token found");

  const [token_name, token_value] = req.headers.authorization.split(' ');
  if(token_name !== 'Bearer') return res.status(403).json("Invalid access token");
  
  const val_token = jwt.verify(token_value, process.env.JWT_SECRET);
  console.log("VAL TOKEN: ", val_token)
  if(!val_token) return res.status(403).json("invalid token");

  if(val_token.role !== 1) return res.status(403).json("User doesn't have admin permissions");
  req.user = {
    user_id: val_token.user_id,
    role: val_token.role
  }
  
  next();
}