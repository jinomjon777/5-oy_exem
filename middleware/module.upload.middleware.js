const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadPath = path.join(__dirname, "..", "uploads", "models")

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1000000) + ext
    cb(null, uniqueName)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/avif"]

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Faqat png, jpg, jpeg, avif webp fayl mumkin"))
  }
}

const uploadModelImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}).fields([
  { name: "insideImage", maxCount: 1 },
  { name: "outsideImage", maxCount: 1 },
  { name: "imageURL", maxCount: 1 }
])

module.exports = uploadModelImages