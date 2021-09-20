const mongoose = require("mongoose");

const NearBankUserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joined: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("User", NearBankUserSchema);
