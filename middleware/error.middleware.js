const CustomErrorhandler = require("../error/custom-error.handler")

module.exports = function(err, req, res, next){
  if (res.headersSent) return next(err)

  if(err instanceof CustomErrorhandler){
    return res.status(err.status || 400).json({message: err.message, errors: err.errors})
  }

  if(err.name === "ValidationError"){
    const validationError = Object.values(err.errors).map(error=> error.message)

    return res.status(400).json({
      messageName: "ValidationError",
      errors: validationError
    })
  }

  return res.status(500).json({
    message: err.message
  })
}