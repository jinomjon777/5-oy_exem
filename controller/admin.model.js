const CustomErrorhandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const ModelSchema = require("../schema/model.schema")
const BrendSchema = require("../schema/brend.schema")
const removeFile = require("../utils/remove.file")

const getAdminProfile = async (req, res, next) => {
  try {
    const foundedAdmin = await AuthSchema.findById(req.user.id).select("username email role")

    if (!foundedAdmin) {
      throw CustomErrorhandler.NotFound("Admin not found")
    }

    const models = await ModelSchema.find({ createdBy: req.user.id })
      .populate("brendInfo", "brendName")
      .select("title brendInfo gearbook tanirovkasi motor year color distance price imageURL")

    res.status(200).json({
      admin: foundedAdmin,
      models
    })
  } catch (error) {
    next(error)
  }
}

const getAdminModels = async (req, res, next) => {
  try {
    const models = await ModelSchema.find({ createdBy: req.user.id })
      .populate("brendInfo", "brendName")
      .select("title brendInfo gearbook tanirovkasi motor year color distance price imageURL")

    res.status(200).json(models)
  } catch (error) {
    next(error)
  }
}

const getOneAdminModel = async (req, res, next) => {
  try {
    const { id } = req.params

    const foundedModel = await ModelSchema.findOne({
      _id: id,
      createdBy: req.user.id
    }).populate("brendInfo", "brendName imageURL")

    if (!foundedModel) {
      throw CustomErrorhandler.NotFound("Model not found")
    }

    res.status(200).json(foundedModel)
  } catch (error) {
    next(error)
  }
}

const addAdminModel = async (req, res, next) => {
  try {
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
      description
    } = req.body

    const foundedBrend = await BrendSchema.findById(brendInfo)

    if (!foundedBrend) {
      throw CustomErrorhandler.NotFound("Brend not found")
    }

    if (!req.files || !req.files.insideImage || !req.files.outsideImage || !req.files.imageURL) {
      throw CustomErrorhandler.BadRequest("3 ta rasm ham yuklanishi kerak")
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
      insideImage: req.files.insideImage[0].path.replace(/\\/g, "/"),
      outsideImage: req.files.outsideImage[0].path.replace(/\\/g, "/"),
      imageURL: req.files.imageURL[0].path.replace(/\\/g, "/"),
      createdBy: req.user.id
    })

    res.status(201).json({
      message: "Added model",
      data: newModel
    })
  } catch (error) {
    next(error)
  }
}

const updateAdminModel = async (req, res, next) => {
  try {
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
      description
    } = req.body

    const foundedModel = await ModelSchema.findOne({
      _id: id,
      createdBy: req.user.id
    })

    if (!foundedModel) {
      throw CustomErrorhandler.NotFound("Model not found")
    }

    const foundedBrend = await BrendSchema.findById(brendInfo)

    if (!foundedBrend) {
      throw CustomErrorhandler.NotFound("Brend not found")
    }

    const updateData = {
      brendInfo,
      title,
      tanirovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description
    }

    if (req.files && req.files.insideImage) {
      removeFile(foundedModel.insideImage)
      updateData.insideImage = req.files.insideImage[0].path.replace(/\\/g, "/")
    }
 
    if (req.files && req.files.outsideImage) {
      removeFile(foundedModel.outsideImage)
      updateData.outsideImage = req.files.outsideImage[0].path.replace(/\\/g, "/")
    }

    if (req.files && req.files.imageURL) {
      removeFile(foundedModel.imageURL)
      updateData.imageURL = req.files.imageURL[0].path.replace(/\\/g, "/")
    }

    const updatedModel = await ModelSchema.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      message: "Updated model",
      data: updatedModel
    })
  } catch (error) {
    next(error)
  }
}

const deleteAdminModel = async (req, res, next) => {
  try {
    const { id } = req.params

    const foundedModel = await ModelSchema.findOne({
      _id: id,
      createdBy: req.user.id
    })

    if (!foundedModel) {
      throw CustomErrorhandler.NotFound("Model not found")
    }

    removeFile(foundedModel.insideImage)
    removeFile(foundedModel.outsideImage)
    removeFile(foundedModel.imageURL)

    await ModelSchema.findByIdAndDelete(id)

    res.status(200).json({
      message: "Deleted model"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAdminProfile,
  getAdminModels,
  getOneAdminModel,
  addAdminModel,
  updateAdminModel,
  deleteAdminModel
}