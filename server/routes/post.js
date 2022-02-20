const express=require("express");
const router= express.Router();
const mongoose= require("mongoose");
const Post= require("../models/post");
const User=require("../models/user");
const requireLogin= require("../middleware/requireLogin")



router.post("/createpost",requireLogin,(req,res)=>{
   
    const {title,body,photo} = req.body;
    console.log(req.body);
   

 if(!title || !body || !photo)
 {
  
   return  res.status(422).json({error:"Please add Title and Body"});
 }



 const post= new Post({
     title,
     body,
     photo,
     postedBy:req.user
 });

 post.save().then(()=>res.status(200).send("Sucessfully Posted")).catch((err)=>console.log(err));

});

router.get("/allpost",(req,res)=>{

  
   Post.find().populate("postedBy","_id name").then((data)=>res.status(202).send(data)).catch(err=>console.log(err));


});

router.get("/mypost",requireLogin,(req,res)=>{
   Post.find({postedBy:req.user.id})
   .populate("postedBy","_id name")
   .then(mypost=>res.status(200).send(mypost))
   .catch((err)=>console.log(err));

});

router.get("/profilepicture",requireLogin,(req,res)=>{
     
      const {profilepicture} =req.user
      res.status(200).send(profilepicture);
});

router.post("/likes",(req,res)=>{

      Post.findOneAndUpdate({_id:req.body.id},{$inc: {likes:1}},(err,res)=>{
         if(err)
         {
            console.log(err);
         }
         else
         {
            console.log(res);
         }
      });   
      
   req.body
})

router.post("/comment",async (req,res)=>{

     try{ 
            const{id,comment}=req.body;
            const resDb = await Post.findByIdAndUpdate(id,{$push:{comments:comment}});
            console.log(resDb);

            res.status(200).json({response:"Done"});
            
     }
  catch(err){
     console.log(err);
  }

});

module.exports= router;