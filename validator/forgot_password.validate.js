const Joi = require("joi")

const forgotPasswordValidate = (data)=>{
  const schema = Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().min(6).max(64).required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
  })

  return schema.validate(data, { abortEarly: true })
}

module.exports = forgotPasswordValidate