const express=require("express")
const cors=require("cors")
const connectDB = require("./config/db.config")
const errorMiddleware = require("./middleware/error.middleware")
require("dotenv").config()
const cookieParser=require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const profileRouter = require("./routes/profil.routes")
const passwordRouter = require("./routes/profile.password.routes")
const brendRouter = require("./routes/brend.routes")
const Modelrouter = require("./routes/model.routes")

const PORT = process.env.PORT || 3000
const app=express()

connectDB()
 
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// profile uploads
app.use("/uploads", express.static("uploads"))

//router
app.use(brendRouter)
app.use(authRouter)
app.use(profileRouter)
app.use(passwordRouter)
app.use(Modelrouter)

app.use(errorMiddleware)

app.listen(PORT, ()=>{ 
  console.log("Server is runing at: "+PORT);          
})