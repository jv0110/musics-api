const Joi = require('joi');

module.exports = async(req, res, next) => {
  const user_schema = Joi.object({
    artist_name: Joi.string()
    .required(),
    artist_genre: Joi.string()
    .required(),
  });
  const validate = user_schema.validate(req.body);
  console.log(validate);
  if(validate.error){
    return res.status(400).json(validate.error.details[0].message);
  }
  next();
}