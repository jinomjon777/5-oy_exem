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
      required: true,
      trim: true
    },

    tanirovkasi: {
      type: String,
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
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "auth",
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