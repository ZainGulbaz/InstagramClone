const express= require("express");
const User = require("../models/user");
const app= express();
const router= express.Router();




app.get("/getProfilePicture",(req,res)=>
{
    
    //  User.find({req.user.id})
    console.log("req"+req);
    res.send("Hello");

});

module.exports=router;