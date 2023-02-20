const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const  decoded = jwt.verify(token, 'ravi');
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
                res.send({"err":err.message,"masage":"Please login first"})
        }
    }else{
        res.send({"masage":"Please login"})
    }
}
module.exports={authenticate}