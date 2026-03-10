const CustomErrorhandler = require("../error/custom-error.handler")
const ModelSchema = require("../schema/model.schema")
const BrendSchema = require("../schema/brend.schema")

const getAllModels = async (req,res,next)=>{
  try{

    const models = await ModelSchema.find()
      .select("title price imageURL")

    res.status(200).json(models)

  }catch(error){
    next(error)
  }
}

const getOneModel = async (req,res,next)=>{
  try{

    const { id } = req.params

    const foundedModel = await ModelSchema.findById(id)
      .populate("brendInfo", "brendName imageURL")

    if(!foundedModel){
      throw CustomErrorhandler.NotFound("Model not found")
    }

    res.status(200).json(foundedModel)

  }catch(error){
    next(error)
  }
}

const getModelsByBrend = async (req,res,next)=>{
  try{

    const { brendId } = req.params

    const models = await ModelSchema.find({ brendInfo: brendId })
      .select("title price imageURL")

    res.status(200).json(models)

  }catch(error){
    next(error)
  }
}


module.exports = {
  getAllModels,
  getOneModel,
  getModelsByBrend,
}