const Joi = require('joi');

module.exports = async(req, res, next) => {
  const data_schema = Joi.object({
    album_name: Joi.string()
    .required()
  });
  const new_data_schema = Joi.object({
    album_name: Joi.string(),
    album_genre: Joi.string(),
  });
  const validate_data = data_schema.validate({ album_name: req.body.album_name } );
  const validate_new_data = new_data_schema.validate(req.body.new);
  if(validate_data.error) 
    return res.status(400).json(validate_data.error);
  if(validate_new_data.error) 
    return res.status(400).json(validate_new_data.error);

  next();
}