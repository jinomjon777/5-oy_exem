const CustomErrorhandler = require("../error/custom-error.handler")
const bcrypt=require("bcryptjs")
const sendMessage = require("../utils/sint.email")
const AuthSchema = require("../schema/auth.schema")
const {refresh_token, access_token } = require("../utils/jwt")


const Register = async (req,res, next)=>{
  try{
    const {username,email,password} = req.body

    const foundedUser = await AuthSchema.findOne({email})

    if(foundedUser){
      throw CustomErrorhandler.BadRequest("User already exsist")
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const code = String(Math.floor(100000 + Math.random()*900000))

    await sendMessage(code,email)

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: code,
      otpTime: new Date(Date.now() + 120000)
    })

    res.status(200).json({message: "Registered"})
  }catch(error){
    next(error)
  }
}


const Verify = async (req,res, next)=>{
  try{
    const {email,code} = req.body
    
    const foundedUser = await AuthSchema.findOne({email})
    
    if(!foundedUser){
      throw CustomErrorhandler.BadRequest("User not found")
    }
    
    if(!foundedUser.otp){
      throw CustomErrorhandler.UnAuthorized("Otp not found")
    }
    
    if(Date.now() > foundedUser.otpTime){
      throw CustomErrorhandler.UnAuthorized("Otp exspired")
    }
    
    if(foundedUser.otp !== code){
      throw CustomErrorhandler.UnAuthorized("Wrong otp")
    }
    
    await AuthSchema.findByIdAndUpdate(foundedUser._id,{
      otp: "", 
      otpTime: 0,
    })
    
    const accessToken = access_token({
      id: foundedUser._id, 
      role: foundedUser.role, 
      email: foundedUser.email
    })
    const refreshToken = refresh_token({
      id: foundedUser._id, 
      role: foundedUser.role, 
      email: foundedUser.email
    })

    await AuthSchema.findByIdAndUpdate(foundedUser._id,{refreshToken})

    res.cookie("refresh_token",
      refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000*60*15,
      })
      
      res.status(200).json({
        message: "Succses",
        accessToken
      })
    }catch(error){
    next(error)
  }
}

  const Login = async (req,res, next)=>{
    try{
      const {email,password} = req.body

      const foundedUser = await AuthSchema.findOne({email})

      if(!foundedUser){
        throw CustomErrorhandler.BadRequest("User not found")
      }

      const check = await bcrypt.compare(password, foundedUser.password)

      if(check){
        const code = String(Math.floor(100000 + Math.random()*900000))
    
        await sendMessage(code,email)
    
        await AuthSchema.findByIdAndUpdate(foundedUser._id,{
          otp: code,
          otpTime: new Date(Date.now() + 120000)
        })

        res.status(200).json({message: "Please check your email"})
      }else{
        throw CustomErrorhandler.UnAuthorized("Wrong opt")
      }


    }catch(error){
      next(error)
    }
  }


const Logout = async (req,res, next)=>{
  try{
    const foundedUser = await AuthSchema.findOne({email: req["user"].email})

    if(!foundedUser){
      throw CustomErrorhandler.BadRequest("User not found")
    }

    res.clearCookie("refresh_token")
      await AuthSchema.findByIdAndUpdate(foundedUser._id,{
        refreshToken: ""
      })

      res.status(200).json({message: "Logged out"})
  }catch(error){
    next(error)
  }
}

module.exports = {
  Register,
  Verify,
  Login,
  Logout
}