const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database successfully connected!");
})
.catch((err)=>{
    console.log("Error : " + err);
})

const app = express();

app.use(express.json());

app.use("/api/auth",router);



app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});