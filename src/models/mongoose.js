const mongoose = require("mongoose");

function createMongoose() {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, error => {
    if (error) throw error;
    console.log("Connection to MongoDB has been established!");
  });

  return mongoose;
}

module.exports = createMongoose;
