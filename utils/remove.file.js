const fs = require("fs")
const path = require("path")

const removeFile = (filePath) => {
  if (!filePath) return

  const fullPath = path.join(__dirname, "..", filePath)

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath)
  }
}

module.exports = removeFile