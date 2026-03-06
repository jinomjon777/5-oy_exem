const { Schema } = require("mongoose")

const ProfileSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
      trim: true
    },

    lastName: {
      type: String,
      default: "",
      trim: true
    },

    phone: {
      type: String,
      default: "",
      trim: true
    },

    avatarUrl: {
      type: String,
      default: ""
    },

    avatarPath: {
      type: String,
      default: ""
    }
  },
  {
    _id: false,
    versionKey: false
  }
)

module.exports = ProfileSchema