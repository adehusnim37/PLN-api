const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
