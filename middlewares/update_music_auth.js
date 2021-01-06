const Joi = require('joi');

module.exports = async (req, res, next) => {
  const schema = Joi.object({
    music_title: Joi.string()
    .required()
  });
  const validate_data = schema.validate({
    music_title: req.body.music_title
  });
  if(validate_data.error)
    return res.status(400).json(validate_data.error);

  const new_data_validate = schema.validate(req.body.new);
  if(new_data_validate.error)
    return res.status(400).json(new_data_validate.error);

  next();
}