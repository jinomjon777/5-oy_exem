const mongoose=require("mongoose")

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Conected to db "))
    .catch((error)=>console.log(error.message))
}

module.exports= connectDB