// this code exports a function called connectDB that connects to a MongoDB database using the Mongoose library.
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // the `connect` method returs a connection object that represents the connection to the MondoDB server. If the connection is succesful, the function logs a message to the console indicating that the connection was successful, and returns the connection object.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // if the connection is not succesful, the function logs an error and exits the process with an error code.
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
