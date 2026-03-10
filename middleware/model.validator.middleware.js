const modelValidator = require("../validator/model.validator")

const modelValidatorMiddleware = (req, res, next) => {

  const { error } = modelValidator(req.body)

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }

  if (!req.files || !req.files.insideImage || !req.files.outsideImage || !req.files.imageURL) {
    return res.status(400).json({
      message: "3 ta rasm yuklanishi kerak"
    })
  }

  next()
}

module.exports = modelValidatorMiddleware