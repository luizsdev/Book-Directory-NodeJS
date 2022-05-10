const mongoose = require("mongoose");
const db = require("../config/db");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "----",
    require: true,
  },
  id: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    default: "----",
    require: true,
  },
});

const bookmodel = db.model("books", bookSchema);

module.exports = bookmodel;
