const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/books";
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected sucessfully to database");
  })
  .catch(() => {
    console.log("Couldn't connect to database");
  });
const connection = mongoose.connection;
module.exports = connection;
