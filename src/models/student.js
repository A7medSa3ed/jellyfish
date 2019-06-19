const mongoose = require("mongoose");

const { Schema } = mongoose;

const subjectSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  grade: {
    type: String
  }
});

const studentSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subjects: [
    {
      type: [subjectSchema]
    }
  ]
});

module.exports = mongoose.model("student", studentSchema);
