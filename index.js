const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const errorMiddleware = require("./middleware/error.middleware")
require("dotenv").config()
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.routes")
const profileRouter = require("./routes/profil.routes")
const passwordRouter = require("./routes/profile.password.routes")
const brendRouter = require("./routes/brend.routes")
const Modelrouter = require("./routes/model.routes")

const yaml = require("yamljs")
const swaggerUI = require("swagger-ui-express")
const adminRouter = require("./routes/admin.model.routes")
const adminBrendRouter = require("./routes/admin.brend.routes")
const requestLogger = require("./middleware/request.logger.middleware")

const PORT = process.env.PORT || 3000
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

const swaggerDocument = yaml.load("./docs/document.yml")
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/uploads", express.static("uploads"))

app.use(authRouter)
app.use(profileRouter)
app.use(passwordRouter)
app.use(brendRouter)
app.use(Modelrouter)
app.use("/admin", adminRouter)
app.use("/admin", adminBrendRouter)
app.use(requestLogger)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log("Server is running at:", PORT)
})