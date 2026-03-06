const CustomErrorhandler = require("../error/custom-error.handler")

module.exports = function (req, res, next) {
  try {
    if (!req.user) {
      throw CustomErrorhandler.UnAuthorized("Unauthorized")
    }

    if (req.user.role !== "admin") {
      throw CustomErrorhandler.UnAuthorized("You are not admin")
    }

    next()
  } catch (error) {
    next(error)
  }
}