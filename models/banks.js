const mongoose = require("mongoose");

const allBanks = new mongoose.Schema({}, { collection: "allBanks" });

module.exports = mongoose.model("Banks", allBanks);
