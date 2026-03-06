const {Router}=require("express")
const { Verify, Register, Login, Logout } = require("../controller/auth.controller")
const { ForgotPassword } = require("../controller/forgot.controller")
const forgotPasswordMiddleware = require("../middleware/forgot_password.middleware")
const authorization = require("../middleware/authorization")
const { refresh_token } = require("../utils/jwt")



const authRouter=Router()

authRouter.post("/register",Register)
authRouter.post("/verify",Verify)
authRouter.post("/login",Login)
authRouter.get("/logout",authorization,Logout)
authRouter.get("/refresh", refresh_token)
authRouter.post("/forgot_password", forgotPasswordMiddleware, ForgotPassword)

module.exports= authRouter
