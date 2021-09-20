const mongoose = require("mongoose");

const Branchs = new mongoose.Schema(
  {
    reviews: {
      type: Array,
    },
  },
  { collection: "Branchs" }
);

module.exports = mongoose.model("Branchs", Branchs);
