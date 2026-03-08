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

const addModel = async (req,res,next)=>{
  try{

    const {
      brendInfo,
      title,
      tanirovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description,
      insideImage,
      outsideImage,
      imageURL
    } = req.body

    const foundedBrend = await BrendSchema.findById(brendInfo)

    if(!foundedBrend){
      throw CustomErrorhandler.NotFound("Brend not found")
    }

    const newModel = await ModelSchema.create({
      brendInfo,
      title,
      tanirovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description,
      insideImage,
      outsideImage,
      imageURL
    })

    res.status(201).json({
      message: "Added model",
      data: newModel
    })

  }catch(error){
    next(error)
  }
}

const updateModel = async (req,res,next)=>{
  try{

    const { id } = req.params

    const {
      brendInfo,
      title,
      tanirovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description,
      insideImage,
      outsideImage,
      imageURL
    } = req.body

    const foundedModel = await ModelSchema.findById(id)

    if(!foundedModel){
      throw CustomErrorhandler.NotFound("Model not found")
    }

    const foundedBrend = await BrendSchema.findById(brendInfo)

    if(!foundedBrend){
      throw CustomErrorhandler.NotFound("Brend not found")
    }

    const updatedModel = await ModelSchema.findByIdAndUpdate(
      id,
      {
        brendInfo,
        title,
        tanirovkasi,
        motor,
        year,
        color,
        distance,
        gearbook,
        price,
        description,
        insideImage,
        outsideImage,
        imageURL
      },
      { new: true }
    )

    res.status(200).json({
      message: "Updated model",
      data: updatedModel
    })

  }catch(error){
    next(error)
  }
}

const deleteModel = async (req,res,next)=>{
  try{

    const { id } = req.params

    const foundedModel = await ModelSchema.findById(id)

    if(!foundedModel){
      throw CustomErrorhandler.NotFound("Model not found")
    }

    await ModelSchema.findByIdAndDelete(id)

    res.status(200).json({
      message: "Deleted model"
    })

  }catch(error){
    next(error)
  }
}

module.exports = {
  getAllModels,
  getOneModel,
  getModelsByBrend,
  addModel,
  updateModel,
  deleteModel
}