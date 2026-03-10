const { Router } = require("express")
const adminMiddleware = require("../middleware/admin.middleware")
const authorization = require("../middleware/authorization")
const { getAllModels, getOneModel, getModelsByBrend, getMyModels, getOneMyModel, addModel, updateModel, deleteModel } = require("../controller/model.controller")



const Modelrouter = Router()

// user tomoni
Modelrouter.get("/get_all_models", getAllModels)
Modelrouter.get("/get_one_model/:id", getOneModel)
Modelrouter.get("/get_models_by_brend/:brendId", getModelsByBrend)



module.exports = Modelrouter