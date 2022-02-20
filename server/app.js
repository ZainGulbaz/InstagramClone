const express = require ("express");
require("dotenv").config();
const app = express();
const cors= require("cors");
app.use(cors());
const router=require("./routes/auth");
const User=require("./models/user");
const Post = require("./models/post");

//Middlewares
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));


// MongoDB Atlas Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on("connected",()=>console.log("Connected"));
mongoose.connection.on("error",(err)=>console.log("Not Connected"));

//PORT Listen
app.listen(process.env.PORT,()=>console.log("Connected to the Port "+process.env.PORT));
 
