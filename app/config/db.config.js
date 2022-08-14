require('dotenv').config();

module.exports = {
    //url: "mongodb+srv://slby99:slby99@cluster0.bgg9ug7.mongodb.net/?retryWrites=true&w=majority"
    url: process.env.MONGODB_URI
  };