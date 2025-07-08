const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: String,
    default: "Yet to be rented",
  },
});

const room = mongoose.model("room", schema);

module.exports = room;
