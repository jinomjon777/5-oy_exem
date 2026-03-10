const CustomErrorhandler = require("../error/custom-error.handler")
const jwt = require("jsonwebtoken")
const { access_token } = require("../utils/jwt")

module.exports = function(req,res,next){
  try{

    const refreshToken = req.cookies.refresh_token

    if(!refreshToken){
      throw CustomErrorhandler.UnAuthorized("Refresh token not found")
    }

    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    )

    const accessToken = access_token({
      id: decode.id,
      role: decode.role,
      email: decode.email
    })

    res.status(200).json({
      accessToken
    })

  }catch(error){
    next(error)
  }
}