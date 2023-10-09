const express = require("express");
const connectToMongo = require ("./db");
const cors = require("cors");
require('dotenv').config()


connectToMongo()
const app = express();
app.use(express.json())
port = process.env.PORT;
const temp = async () => {
   
}

temp();

app.use(cors());
app.use("/api/user", require("./routes/userRoutes"));


app.listen(port, () =>{
  
    console.log(`listening on port ${port}`)
})