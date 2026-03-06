const CustomErrorhandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const bcrypt = require("bcryptjs")

const ChangePassword = async (req,res,next)=>{
  try{
    const { email, currentPassword, newPassword, confirmPassword } = req.body

    if(!email || !currentPassword || !newPassword || !confirmPassword){
      throw CustomErrorhandler.BadRequest("All fields required")
    }

    if(newPassword !== confirmPassword){
      throw CustomErrorhandler.BadRequest("Confirm password not match")
    }

    const foundedUser = await AuthSchema.findById(req["user"].id)
    if(!foundedUser){
      throw CustomErrorhandler.NotFound("User not found")
    }

    const e = String(email).trim().toLowerCase()
    if(e !== String(foundedUser.email).toLowerCase()){
      throw CustomErrorhandler.BadRequest("Email wrong")
    }

    const isMatch = await bcrypt.compare(currentPassword, foundedUser.password)
    if(!isMatch){
      throw CustomErrorhandler.BadRequest("Current password wrong")
    }

    const hash = await bcrypt.hash(newPassword, 12)
    foundedUser.password = hash

    await foundedUser.save()

    res.status(200).json({
      message: "Password changed"
    })

  }catch(error){
    next(error)
  }
}

module.exports = {
  ChangePassword
}