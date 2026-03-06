const CustomErrorhandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const path = require("path")
const fs = require("fs")

const deleteFile = (filePath)=>{
  if(!filePath) return
  if(fs.existsSync(filePath)){
    fs.unlinkSync(filePath)
  }
}

const ProfileGet = async (req,res,next)=>{
  try{
    const foundedUser = await AuthSchema.findById(req["user"].id)

    if(!foundedUser){
      throw CustomErrorhandler.NotFound("User not found")
    }

    if(!foundedUser.profile){
      foundedUser.profile = {}
      await foundedUser.save()
    }

    res.status(200).json({
      message: "Profile",
      profile: foundedUser.profile
    })

  }catch(error){
    next(error)
  }
}

const ProfileUpdate = async (req,res,next)=>{
  try{
    const { email, firstName, lastName, phone } = req.body

    if(!email){
      throw CustomErrorhandler.BadRequest("Email required")
    }

    const foundedUser = await AuthSchema.findById(req["user"].id)
    if(!foundedUser){
      throw CustomErrorhandler.NotFound("User not found")
    }

    if(!foundedUser.profile){
      foundedUser.profile = {}
    }

    const e = String(email).trim().toLowerCase()
    if(e !== String(foundedUser.email).trim().toLowerCase()){
      throw CustomErrorhandler.BadRequest("Email wrong")
    }

    if(firstName !== undefined) foundedUser.profile.firstName = String(firstName).trim()
    if(lastName !== undefined) foundedUser.profile.lastName = String(lastName).trim()
    if(phone !== undefined) foundedUser.profile.phone = String(phone).replace(/[()\s-]/g,"").trim()

    foundedUser.markModified("profile")
    await foundedUser.save()

    res.status(200).json({
      message: "Profile updated",
      profile: foundedUser.profile
    })

  }catch(error){
    next(error)
  }
}

const ProfileAvatar = async (req,res,next)=>{
  try{

    if(!req.file){
      throw CustomErrorhandler.BadRequest("Profile avatar required")
    }

    const foundedUser = await AuthSchema.findById(req["user"].id)

    if(!foundedUser){
      throw CustomErrorhandler.NotFound("User not found")
    }

    if(!foundedUser.profile){
      foundedUser.profile = {}
    }

    if(foundedUser.profile.avatarPath){
      const oldPath = path.join(process.cwd(), foundedUser.profile.avatarPath)
      deleteFile(oldPath)
    }

    const relPath = path.join("uploads","avatars",req.file.filename).replace(/\\/g,"/")
    const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 4001}`
    const url = `${base}/${relPath}`

    foundedUser.profile.avatarPath = relPath
    foundedUser.profile.avatarUrl = url

    await foundedUser.save()

    res.status(200).json({
      message: "Profile avatar updated",
      avatarUrl: foundedUser.profile.avatarUrl
    })

  }catch(error){
    next(error)
  }
}

module.exports = {
  ProfileGet,
  ProfileUpdate,
  ProfileAvatar
}