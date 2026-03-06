const {Router} = require("express")
const authorization = require("../middleware/authorization")
const { ChangePassword } = require("../controller/profile.password.controller")


const passwordRouter = Router()

passwordRouter.put("/profile/password", authorization, ChangePassword)

module.exports = passwordRouter