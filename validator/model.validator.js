const Joi = require("joi")

const modelValidator = (data)=>{

const schema = Joi.object({

title: Joi.string().min(2).max(50).required(),

price: Joi.number().required(),

imageURL: Joi.string().uri().required(),

brendInfo: Joi.string().required()

})

return schema.validate(data)

}

module.exports = modelValidator