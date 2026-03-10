const BrendSchema = require("../schema/brend.schema")
const CustomErrorHandler = require("../error/custom-error.handler")

const getAdminBrends = async (req, res, next) => {
  try {

    const brends = await BrendSchema.find({
      createdBy: req.user.id
    }).sort({ createdAt: -1 })

    res.status(200).json(brends)

  } catch (error) {
    next(error)
  }
}

const getOneAdminBrend = async (req, res, next) => {
  try {

    const { id } = req.params

    const brend = await BrendSchema.findOne({
      _id: id,
      createdBy: req.user.id
    })

    if (!brend) {
      throw CustomErrorHandler.NotFound("Brend not found")
    }

    res.status(200).json(brend)

  } catch (error) {
    next(error)
  }
}

const addAdminBrend = async (req, res, next) => {
  try {

    const { brendName, imageURL } = req.body

    const foundedBrend = await BrendSchema.findOne({ brendName })

    if (foundedBrend) {
      throw CustomErrorHandler.BadRequest("Brend already exists")
    }

    const newBrend = await BrendSchema.create({
      brendName,
      imageURL,
      createdBy: req.user.id
    })

    res.status(201).json({
      message: "Brend created",
      data: newBrend
    })

  } catch (error) {
    next(error)
  }
}

const updateAdminBrend = async (req, res, next) => {
  try {

    const { id } = req.params
    const { brendName, imageURL } = req.body

    const foundedBrend = await BrendSchema.findOne({
      _id: id,
      createdBy: req.user.id
    })

    if (!foundedBrend) {
      throw CustomErrorHandler.NotFound("Brend not found")
    }

    const updatedBrend = await BrendSchema.findByIdAndUpdate(
      id,
      {
        brendName,
        imageURL
      },
      {
        new: true,
        runValidators: true
      }
    )

    res.status(200).json({
      message: "Brend updated",
      data: updatedBrend
    })

  } catch (error) {
    next(error)
  }
}

const deleteAdminBrend = async (req, res, next) => {
  try {

    const { id } = req.params

    const foundedBrend = await BrendSchema.findOne({
      _id: id,
      createdBy: req.user.id
    })

    if (!foundedBrend) {
      throw CustomErrorHandler.NotFound("Brend not found")
    }

    await BrendSchema.findByIdAndDelete(id)

    res.status(200).json({
      message: "Brend deleted"
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAdminBrends,
  getOneAdminBrend,
  addAdminBrend,
  updateAdminBrend,
  deleteAdminBrend
}