const {Router} = require("express")
const { ProfileGet, ProfileUpdate, ProfileAvatar } = require("../controller/profile.controller")
const uploadProfile = require("../middleware/profile.middleware")
const authorization = require("../middleware/authorization")


const profileRouter = Router()

profileRouter.get("/profile", authorization, ProfileGet)
profileRouter.put("/profile", authorization, ProfileUpdate)
profileRouter.put("/profile/avatar", authorization, uploadProfile, ProfileAvatar)

module.exports = profileRouter