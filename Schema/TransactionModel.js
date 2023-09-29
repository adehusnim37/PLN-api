const mongoose = require("mongoose");
const validator = require("validator");

const transactionSchema = new mongoose.Schema({
  Nominal: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  token: {
    type: mongoose.Schema.ObjectId,
    ref: "Token",
    required: [true, "Transaction must belong to a token"],
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
