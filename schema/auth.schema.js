const { Schema, default: mongoose } = require("mongoose");
const ProfileSchema = require("./profile.schema"); 

const Auth = new Schema(
  {
    username: {
      type: String,
      required: [true, "Foydalanuvchi nomi kiritilishi shart"],
      trim: true,
      minlength: [3, "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak"],
      maxlength: [50, "Foydalanuvchi nomi 50 ta belgidan oshmasligi kerak"],
      match: [/^[a-zA-Z\s]+$/, "Foydalanuvchi nomida faqat harflar va bo'sh joy bo'lishi mumkin"],
    },

    email: {
      type: String,
      required: [true, "Email kiritilishi shart"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email formati noto'g'ri"],
    },

    password: {
      type: String,
      required: [true, "Parol kiritilishi shart"],
      minlength: [6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"],
      trim: true,
    },

    role: {
      type: String,
      default: "user",
    },

    otp: {
      type: String,
      default: null,
    },

    otpTime: {
      type: Date,
      default: null,
    },

    refresh_token:{
      type: String
    },
    profile: {
      type: ProfileSchema,
      default: () => ({})
    }

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AuthSchema = mongoose.model("auth", Auth);

module.exports = AuthSchema;