const CustomErrorhandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const bcrypt = require("bcryptjs")

const ForgotPassword = async (req,res,next)=>{
  try{

    const { email, newPassword, confirmPassword } = req.body

    if(!email || !newPassword || !confirmPassword){
      throw CustomErrorhandler.BadRequest("All fields required")
    }

    if(newPassword !== confirmPassword){
      throw CustomErrorhandler.BadRequest("Confirm password not match")
    }

    const e = String(email).trim().toLowerCase()

    const foundedUser = await AuthSchema.findOne({ email: e })
    if(!foundedUser){
      throw CustomErrorhandler.NotFound("User not found")
    }

    const hash = await bcrypt.hash(newPassword, 12)
    foundedUser.password = hash

    // agar sende refresh token hash bo'lsa sessiyani bekor qil
    if("refreshTokenHash" in foundedUser){
      foundedUser.refreshTokenHash = null
    }

    await foundedUser.save()

    res.status(200).json({
      message: "Password updated"
    })

  }catch(error){
    next(error)
  }
}

module.exports = { ForgotPassword }