const jwt=require("jsonwebtoken");
const {client} = require("../config/redisDB");
const { BlockModel } = require("../Models/blockUser");
require("dotenv").config();
const authenticator= async(req,res,next)=>{
    // const token=req.headers.authorization;
    const token = req.cookies.token
    // const isBlacklist = await client.HGET("tokensObj" ,token)
    const isBlacklist= await BlockModel.findOne({token})

    // console.log(isBlacklist);
    if(!isBlacklist){
        const decoded=jwt.verify(token,process.env.secret,(err,decoded)=>{
            if(err){
                res.status(400).json({"err":"Please Login first"})
            }else{
              
                req.body.userID=decoded.userID
                next()
            }
        })
        
    }else{
        res.status(400).json({"err":"Please Login first"})
    }
}  
module.exports={authenticator}