const CustomErrorhandler = require("../error/custom-error.handler")
const BrendSchema = require("../schema/brend.schema")


const getAllBrend = async (req,res, next)=>{
try{
  const brend=await BrendSchema.find()

  res.status(200).json(brend)
}catch(error){
  next(error)
}
}

const search  = async (req,res, next)=>{
try{
  const {searchingValue}=req.query
  const result=await BrendSchema.find({
    brendName: { $regex: searchingValue, $options: "i"}
  })

  res.status(200).json(result)
}catch(error){
  next(error)
}
}

const getOneBrend = async (req,res, next)=>{
try{
  const {id}=req.params

  foundedBrend=await BrendSchema.findById(id)

  if(!foundedBrend){
    throw CustomErrorhandler.NotFound("Brend not found")
  }

  res.status(200).json(foundedBrend)
}catch(error){
  next(error)
}
}

const addBrend = async (req,res, next)=>{
try{
 const {brendName, imageURL}=req.body

 await BrendSchema.create({brendName, imageURL})

 res.status(201).json({
  message: "Added brend"
 })
}catch(error){
 next(error)
}
}

const updateBrend = async (req,res, next)=>{
try{
  const {brendName, imageURL}=req.body
  const {id}=req.params

  foundedBrend=await BrendSchema.findById(id)

  if(!foundedBrend){
    throw CustomErrorhandler.NotFound("Brend not found")
  }

  await BrendSchema.findByIdAndUpdate(id, {brendName, imageURL})

  res.status(200).json({
    message: "Updated brend"
  })
}catch(error){
 next(error)
}
}

const deleteBrend = async (req,res, next)=>{
try{
  const {id}=req.params

  foundedBrend=await BrendSchema.findById(id)

  if(!foundedBrend){
    throw CustomErrorhandler.NotFound("Brend not found")
  }

  await BrendSchema.findByIdAndDelete(id)

  res.status(200).json({
    message: "Deleted brend"
  })
}catch(error){
  next(error)
}
}


module.exports={
  getAllBrend,
  search,
  getOneBrend,
  addBrend,
  updateBrend,
  deleteBrend
}
