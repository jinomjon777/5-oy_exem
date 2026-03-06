const joi=require("joi")
const { model, modelNames } = require("mongoose")

const brendValidator =(data)=>{
  const schema =joi.object({
    brendName: joi.string().min(3).max(50).pattern(new RegExp("^[a-zA-Z\\s]+$")).required(),
    imageURL: joi.string()
  })

  return schema.validate(data)
}

module.exports = brendValidator