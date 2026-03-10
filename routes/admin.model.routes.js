const { Router } = require("express")
const authorization = require("../middleware/authorization")
const adminMiddleware = require("../middleware/admin.middleware")
const uploadModelImages = require("../middleware/module.upload.middleware")
const {
  getAdminProfile,
  getAdminModels,
  getOneAdminModel,
  addAdminModel,
  updateAdminModel,
  deleteAdminModel
} = require("../controller/admin.model")

const adminRouter = Router()

adminRouter.get("/profile", authorization, adminMiddleware, getAdminProfile)
adminRouter.get("/profile/models", authorization, adminMiddleware, getAdminModels)
adminRouter.get("/profile/get_one_model/:id", authorization, adminMiddleware, getOneAdminModel)
adminRouter.post("/profile/add_model", authorization, adminMiddleware, uploadModelImages, addAdminModel)
adminRouter.put("/profile/update_model/:id", authorization, adminMiddleware, uploadModelImages, updateAdminModel)
adminRouter.delete("/profile/delete_model/:id", authorization, adminMiddleware, deleteAdminModel)

module.exports = adminRouter