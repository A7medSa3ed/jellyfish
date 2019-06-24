const mongoose = window.require("mongoose");

const { Schema } = mongoose;

const subjectSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  grade: {
    type: Number
  },
  midterm: {
    type: Number
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
  subjects: {
    type: [subjectSchema]
  }
});

module.exports = mongoose.model("student", studentSchema);
