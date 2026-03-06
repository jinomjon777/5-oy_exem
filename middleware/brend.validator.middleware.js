const CustomErrorhandler = require("../error/custom-error.handler")
const brendValidator = require("../validator/brend.validate")

module.exports = function(req,res,next){
  const {error}=brendValidator(req.body)

  if(error){
    throw CustomErrorhandler.BadRequest(error.message)
  }

  next()
}