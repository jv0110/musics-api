const Joi = require('joi');

module.exports = async (req, res, next) => {
  const user_schema = Joi.object({
    user_name: Joi.string()
    .required(),
    user_email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
    user_password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,200}$/)
    .required(),
    role: Joi.number()
    .required()
  });
  const validate = user_schema.validate(req.body);
  if(validate.error) return res.status(400).json(validate.error);

  next();
}