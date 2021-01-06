const Joi = require('joi');

module.exports = async (req, res, next) => {
  const sign_schema = Joi.object({
    user_email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    user_password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{8,200}$/)
  });
  const validate = sign_schema.validate(req.body);
  if(validate.error) return res.status(400).json(validate.error);

  next();
}