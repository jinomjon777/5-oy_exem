const { Schema, default: mongoose } = require("mongoose");

const Model = new Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Rasm manzili majburiy"],
      trim: true,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
        "Rasm havolasi noto'g'ri formatda",
      ],
    },

    title: {
      type: String,
      required: [true, "Model nomi majburiy"],
      trim: true,
      minlength: [2, "Model nomi juda qisqa"],
      maxlength: [50, "Model nomi juda uzun"],
    },

    price: {
      type: Number,
      required: [true, "Narx majburiy"]
    },

    brendInfo: {
      type: Schema.Types.ObjectId,
      ref: "brend",
      required: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ModelSchema = mongoose.model("model", Model);

module.exports = ModelSchema;