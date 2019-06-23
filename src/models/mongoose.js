const mongoose = window.require("mongoose");

function createMongoose() {
  mongoose.connect(
    "mongodb://localhost:27017/jellyfish",
    { useNewUrlParser: true },
    error => {
      if (error) throw error;
      console.log("Connection to MongoDB has been established!");
    }
  );

  return mongoose;
}

module.exports = createMongoose;
