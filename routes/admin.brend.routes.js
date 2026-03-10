const { Router } = require("express")
const authorization = require("../middleware/authorization")
const adminMiddleware = require("../middleware/admin.middleware")
const brendValidatorMiddleware = require("../middleware/brend.validator.middleware")
const { getAdminBrends, getOneAdminBrend, addAdminBrend, updateAdminBrend, deleteAdminBrend } = require("../controller/admin.brend.controller")

const adminBrendRouter = Router()

adminBrendRouter.get("/profile/brends", authorization, adminMiddleware, getAdminBrends)
adminBrendRouter.get("/profile/get_one_brend/:id", authorization, adminMiddleware, getOneAdminBrend)
adminBrendRouter.post("/profile/add_brend", authorization, adminMiddleware, brendValidatorMiddleware, addAdminBrend)
adminBrendRouter.put("/profile/update_brend/:id", authorization, adminMiddleware, brendValidatorMiddleware, updateAdminBrend)
adminBrendRouter.delete("/profile/delete_brend/:id", authorization, adminMiddleware, deleteAdminBrend)

module.exports = adminBrendRouter