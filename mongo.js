const mongoose = require("mongoose");
const studentModel = require("./src/models/student");
// const subjectModel = require("./src/models/subject");

mongoose.connect(
  "mongodb://localhost:27017/jellyfish",
  { useNewUrlParser: true },
  error => {
    if (error) throw error;
    studentModel({
      _id: "140980",
      name: "Medhat Fawzy",
      subjects: [{ _id: "EA106", midterm: 38 }]
    })
      .save()
      .then(err => {
        if (err) throw err;
        process.exit(0);
      })
      .catch(console.error);
  }
);

// mongoose.connect(
//   "mongodb://localhost:27017/jellyfish",
//   { useNewUrlParser: true },
//   error => {
//     if (error) throw error;
//     subjectModel({
//       _id: "EA106",
//       name: "Math"
//     })
//       .save()
//       .then(err => {
//         if (err) throw err;
//         process.exit(0);
//       })
//       .catch(console.error);
//   }
// );
