const { Schema, default: mongoose } = require("mongoose");

const Brend = new Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Brend resm manzili majburiy"],
      trim: true,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
        "Rasm havolasi noto'g'ri formatda",
      ],
    },

    brendName: {
      type: String,
      required: [true, "Brend nomi majburiy"],
      trim: true,
      minlength: [3, "Brend nomi kamida 3 ta belgidan iborat bo'lishi kerak"],
      maxlength: [50,"Brend nomi juda uzun"],
    },
    createdBy:{
    type:Schema.Types.ObjectId,
    ref:"auth"
  },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const BrendSchema = mongoose.model("brend", Brend);

module.exports=BrendSchema