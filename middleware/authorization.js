const CustomErrorhandler = require("../error/custom-error.handler")
const jwt = require("jsonwebtoken")

module.exports= function(req,res,next){
  try{
    const authorization=req.headers.authorization

    if(!authorization){
      throw CustomErrorhandler.UnAuthorized("Bearer token not found")
    }

    const bearer= authorization.split(" ")[0]
    const token = authorization.split(" ")[1]

    if(bearer !== "Bearer" || !token){
      throw CustomErrorhandler.UnAuthorized("Token is required")
    }

    const decode=jwt.verify(token,process.env.SECRET_KEY)
    req["user"]=decode
    
    next()
  }catch(error){
    next(error)
  }
}