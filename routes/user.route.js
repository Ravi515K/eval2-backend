const express=require("express");
const mongoose=require("mongoose")
const {userModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router();

userRouter.get("/",async(req,res)=>{
    try{
        const allUser= await userModel.find()
         res.send(allUser)
    }catch(err){
        console.log(err)
        res.send({"err":err.message,"msg":"Something went wrong"})
    }
    
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body;
    bcrypt.hash(password, 4, async(err, hash) =>{
        if(err){
            res.send({"err":err.message})
        }else{
            const user=new userModel({name,email,gender,password:hash,age,city})
            await user.save();
            res.send({"msg":"user has been registered"})
        }
        // Store hash in your password DB.
    });

   
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await userModel.find({email})
        if(user.length>0){
            var token = jwt.sign({ userID: user[0]._id }, 'ravi');
            res.send({"msg":"user login succesfully","token":token})
        }else{
            res.send("wrong credential")
        }
    }catch(err){
        console.log(err);
       res.send({"err":err.message,"msg":"unable to login"})
    }
})

module.exports={userRouter}

