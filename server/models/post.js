const mongoose= require("mongoose");
const {ObjectId}= mongoose.Schema.Types

const postSchema= new mongoose.Schema({

   title:{
       type:String,
       required:true
   },
   body:{
       type:String,
       require:true
   },
   photo:{
       type:String,
       require:true
   },
   postedBy:{
       type:ObjectId,
       ref:"User"
   },
   likes:{
       type:Number,
       default:0
   },
  comments:{
       type:[String],
       required:false
}


});

module.exports=mongoose.model("Post",postSchema);