const Joi = require('joi');

module.exports = async (req, res, next) => {
  const new_music_schema = Joi.object({
    album_name: Joi.string()
    .required(),
    music_title: Joi.string()
    .required()
  });
  const validate = new_music_schema.validate(req.body);
  if(validate.error) return res.status(400).json(validate.error);
  next();
}