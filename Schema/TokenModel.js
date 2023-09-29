const mongoose = require("mongoose");
const validator = require("validator");

const tokenSchema = new mongoose.Schema({
  token: {
    type: Number,
    required: true,
    unique: true,
    minLength: [20, "Token must have less or equal 20 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ActivatedAt: {
    type: Date,
  },
  IsActivated: {
    type: Boolean,
    default: false,
  },
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
