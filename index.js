const express=require("express");
require('dotenv').config();
const cors=require("cors")
const {connection}=require("./db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { authenticate } = require("./middleware/auth.middleware");
const app=express();


app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

 app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connect to DB")
    }catch(err){
        console.log(err)
    }
    console.log(`server running on port ${process.env.port}`)
 })