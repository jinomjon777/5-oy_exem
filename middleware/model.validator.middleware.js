const modelValidator = require("../validator/model.validator")


const modelValidatorMiddleware = (req,res,next)=>{

const {error} = modelValidator(req.body)

if(error){
return res.status(400).json({
message:error.details[0].message
})
}

next()

}

module.exports = modelValidatorMiddleware