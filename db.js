const mongoose = require("mongoose");
require("dotenv").config();


const mongoUrl = `mongodb+srv://grtsushant:${process.env.PASSWORD}@cluster0.g3brhal.mongodb.net/?retryWrites=true&w=majority`


const connectToMongo = async () =>{
  
  const connect = await mongoose.connect(mongoUrl);
   
  if(connect){
    console.log("Connected to mongo");
  }
}

module.exports = connectToMongo;