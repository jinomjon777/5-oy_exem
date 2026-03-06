const { Router } = require("express")
const adminMiddleware = require("../middleware/admin.middleware")


const {getAllModels,getOneModel,getModelsByBrend,addModel,updateModel,deleteModel} = require("../controller/model.controller")
const authorization = require("../middleware/authorization")

const Modelrouter = Router()

Modelrouter.get("/get_all_models", authorization, getAllModels)
Modelrouter.get("/get_one_model/:id", authorization, getOneModel)
Modelrouter.get("/get_models_by_brend/:brendId", authorization, getModelsByBrend)

Modelrouter.post("/add_model", authorization, adminMiddleware, addModel)
Modelrouter.put("/update_model/:id", authorization, adminMiddleware, updateModel)
Modelrouter.delete("/delete_model/:id", authorization, adminMiddleware, deleteModel)

module.exports = Modelrouter