const Joi = require('joi');

module.exports = async(req, res, next) => {
  const album_schema = Joi.object({
    artist_name: Joi.string()
    .required(),
    album_name: Joi.string()
    .required(),
    album_genre: Joi.string()
    .required()
  });
  const validate = album_schema.validate(req.body);
  if(validate.error) return res.status(400).json(validate.error);
  
  next();
}