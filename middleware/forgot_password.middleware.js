const forgotPasswordValidate = require("../validator/forgot_password.validate")


const forgotPasswordMiddleware = (req,res,next)=>{
  const { error } = forgotPasswordValidate(req.body)

  if(error){
    return res.status(400).json({
      message: error.details[0].message,
      errors: []
    })
  }

  next()
}

module.exports = forgotPasswordMiddleware