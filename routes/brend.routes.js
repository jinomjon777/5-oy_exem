const { Router } = require("express")
const adminMiddleware = require("../middleware/admin.middleware")
const brendValidatorMiddleware = require("../middleware/brend.validator.middleware")

const { getAllBrend,getOneBrend,addBrend,updateBrend,deleteBrend,search} = require("../controller/brend.controller")
const authorization = require("../middleware/authorization")

const brendRouter = Router()

brendRouter.get("/get_all_brends", authorization, getAllBrend)
brendRouter.get("/get_one_brend/:id", authorization, getOneBrend)
brendRouter.get("/search", authorization, search)

brendRouter.post("/add_brend", authorization, adminMiddleware, brendValidatorMiddleware, addBrend)
brendRouter.put("/update_brend/:id", authorization, adminMiddleware, updateBrend)
brendRouter.delete("/delete_brend/:id", authorization, adminMiddleware, deleteBrend)

module.exports = brendRouter