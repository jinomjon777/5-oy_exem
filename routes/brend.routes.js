const { Router } = require("express")
const adminMiddleware = require("../middleware/admin.middleware")
const brendValidatorMiddleware = require("../middleware/brend.validator.middleware")

const { getAllBrend,getOneBrend,addBrend,updateBrend,deleteBrend,search} = require("../controller/brend.controller")
const authorization = require("../middleware/authorization")

const brendRouter = Router()

brendRouter.get("/get_all_brends", getAllBrend)
brendRouter.get("/get_one_brend/:id", getOneBrend)
brendRouter.get("/search", search)

module.exports = brendRouter