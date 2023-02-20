const express=require("express");
const { postModel } = require("../model/post.model");
//const {postModel}=require("../model/post.model")

const postRouter=express.Router();

postRouter.get("/",async(req,res)=>{
    try{
        const post=await postModel.find()
        res.send(post)
    }catch(err){console.log(err)}
   
});

postRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try{
        const addpost=new postModel(payload)
        await addpost.save();
        res.send({"msg":"post created"})
    }catch(err){
        console.log(err)
        res.send({"err":err.message,"msg":"post not be created"})
    }
   

});

postRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id;
    try{
        const post=await postModel.findByIdAndDelete({"_id":ID})
        res.send({"msg":"post deleted "})
    }catch(err){
        console.log(err)
        res.send({"err":err.message,"msg":"post not be deleted"})
    }
})

 postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    const posts = await postModel.findOne({"_id":ID})
    const userID_on_req=req.body.userID;
    const userID_in_post=posts.userID;
    try{
        if(userID_on_req!==userID_in_post){
                res.send({"masg":"user id not match and unauthorised person"})
        }else{
            const post=await postModel.findByIdAndUpdate({"_id":ID},payload)
        res.send({"msg":"post deleted "})
        }
        
    }catch(err){
        console.log(err)
        res.send({"err":err.message,"msg":"post not be deleted"})
    }
 })


module.exports={postRouter}