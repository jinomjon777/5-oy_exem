const multer = require("multer")
const path = require("path")
const fs = require("fs")
const CustomErrorhandler = require("../error/custom-error.handler")

const dir = path.join(process.cwd(),"uploads","avatars")
fs.mkdirSync(dir,{recursive:true})

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,dir)
  },
  filename:(req,file,cb)=>{
    const ext = path.extname(file.originalname || "").toLowerCase()
    const safeExt = [".png",".jpg",".jpeg",".webp"].includes(ext) ? ext : ".png"
    cb(null,`profile_${req["user"].id}_${Date.now()}${safeExt}`)
  }
})

const fileFilter = (req,file,cb)=>{
  const ok = ["image/png","image/jpeg","image/webp"].includes(file.mimetype)
  cb(ok ? null : CustomErrorhandler.BadRequest("Only images allowed"), ok)
}

const upload = multer({
  storage,
  fileFilter,
  limits:{fileSize:2*1024*1024}
})

module.exports = function(req,res,next){
  const u = upload.single("avatar")

  u(req,res,(err)=>{
    if(err){
      return next(err)
    }
    next()
  })
}