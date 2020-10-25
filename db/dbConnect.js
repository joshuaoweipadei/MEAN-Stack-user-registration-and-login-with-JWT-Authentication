const mongoose = require('mongoose');
const config = require('../config');

// Connecting with mongo db
const connectionOptions = { 
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

mongoose.Promise = global.Promise;

const dbConnect = async () => {
  try {
    await mongoose.connect(config.connectionString, connectionOptions);
    console.log("Connection is successful");
  } catch (error) {
    console.log('Database could not connected: ' + error.message)
    process.exit(1);
  }
}

module.exports = dbConnect;