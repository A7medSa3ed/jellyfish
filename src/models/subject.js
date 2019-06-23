const mongoose = window.require("mongoose");

const { Schema } = mongoose;

const subjectSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("subject", subjectSchema);
