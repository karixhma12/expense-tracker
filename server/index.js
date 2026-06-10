const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database successfully connected!");
})
.catch((err)=>{
    console.log("Error : " + err);
})

const app = express();

app.get("/",(req,res)=>{
    res.send("you hit the server!");
})


app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});