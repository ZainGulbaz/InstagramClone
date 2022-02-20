const express=require("express");
const router= express.Router();
const mongoose= require("mongoose");
const User= require("../models/user");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin= require("../middleware/requireLogin");
const JOI = require("joi");


//Home Page
router.get("/",(req,res)=>{
    res.status(200).send("Home Page");
});


//Signup Page
router.post("/signup",async(req,res)=>
{
    const {name,email,password,profilepicture}=req.body;
    const schema = JOI.object({
        emailValid:JOI.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });
    try{
        
       const value= await schema.validateAsync({ emailValid:email});
       
    }
    catch(err)
    {   
        return res.status(422).send(err);
    }
        
      
        if(!email || !password  || !name){
           return res.status(422).send("please send all the inputs")
        }

        User.findOne({email:email},(err, docs) =>{
            if (docs===null){
            bcrypt.hash(password,12,(err,hash)=>
            {
                const user= new User({
                    name,
                    email,
                    password:hash,
                    profilepicture
                    
                });
                user.save().then(()=>res.status(200).send("DataInserted")).catch((err)=>console.log(err));
                
            });
            }
            else{
              res.status(422).send("Email Already Available");
            }
        
        });

        
    
    

   
});

//Singn in Page

router.post("/signin",(req,res)=>{

     const {email,password}=req.body;
     

     if(!email || !password){
         res.status(404).send("please add both email and password")
     }
     else{


          User.findOne({email:email},(err,docs)=>{

             if(docs===null)
             {
                 res.status(422).send("User is not found")
             }
             else
             {
                 bcrypt.compare(password,docs.password,(err,result)=>{

                 if(result) 
                 {
                  const token=jwt.sign({id:docs._id},process.env.JWT_SECRET);
                  res.status(200).send({token,email});
                  
                  
                }
                 else res.status(404).send("Invalid Email or Password");

                 });
             }


          });

     }


});




module.exports=router;