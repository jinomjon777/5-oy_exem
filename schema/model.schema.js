const { Schema, default: mongoose } = require("mongoose")

const Model = new Schema(
  {
    brendInfo: {
      type: Schema.Types.ObjectId,
      ref: "brend",
      required: true
    },

    title: {
      type: String,
      required: [true, "Model nomi majburiy"],
      trim: true,
      minlength: [2, "Model nomi juda qisqa"],
      maxlength: [50, "Model nomi juda uzun"],
    },

    tanirovkasi: {
      type: String,
      required: true,
      default: "Yo'q"
    },

    motor: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    color: {
      type: String,
      required: true
    },

    distance: {
      type: Number,
      required: true
    },

    gearbook: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    insideImage: {
      type: String,
      required: true
    },

    outsideImage: {
      type: String,
      required: true
    },

    imageURL: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const ModelSchema = mongoose.model("model", Model)

module.exports = ModelSchema