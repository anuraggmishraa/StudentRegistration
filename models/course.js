const mongoose = require("mongoose")

module.exports = mongoose.model("Course", new mongoose.Schema({
  name: String,
  duration: String
}))
