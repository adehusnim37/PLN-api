const mongoose = require("mongoose");
const validator = require("validator");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell me your name"],
    maxLength: [35, "Name must have less or equal 35 characters"],
    minLength: [5, "Name must have less or equal 5 characters"],
    validate: [validator.isAlpha, "Nama Harus Karakter"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Harus bertype email"],
  },
  idListrik: {
    type: Number,
    required: true,
    unique: true,
  },
  Jenis: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  saldo: {
    type: Number,
    default: 0,
  },
  kwH: {
    type: Number,
    default: 0,
  },
  transaction: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
      required: [true, "User must have a transaction"],
    },
  ],
});

const User = mongoose.model("User", userModel);

module.exports = User;
