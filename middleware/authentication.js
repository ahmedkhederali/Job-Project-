const {UnauthenticatedError}=require('../errors/index')
const { StatusCodes } = require('http-status-codes')
const User =require("../models/User")
const jwt=require('jsonwebtoken')
require("dotenv")
const auth=(req,res,next)=>{
const authHeader=req.headers.authorization; 
//console.log(authHeader) //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MjFlNWEwM2VmMDQ3ZjFmZjhjOGY5NDAiLCJuYW1lIjoia2hhbGVkMiIsImlhdCI6MTY0NjE1NjI5MSwiZXhwIjoxNjQ4NzQ4MjkxfQ.8bvO4vCSBUppnGCQc0ccL2LAUbmwfmK33YoqWFwb2Bo 
if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new UnauthenticatedError('Authenticated Invalid') //401 unauthorize user
}
const token=authHeader.split(' ')[1];
//console.log(token)
try {
    const decode=jwt.verify(token,process.env.JWT_SECRET)     // how to decode token
    //console.log(decode)       // {userID: '621e5a03ef047f1ff8c8f940',name: 'khaled2',iat: 1646156291,exp: 1648748291}
    req.user = {userID:decode.userID,name:decode.name} // using in createdBy and it's very important
    next() // important must be written
} catch (error) { 
    throw new UnauthenticatedError('Authenticated Invalid')
}
}
module.exports=auth
// هدف الجزء ده انه يعمل التاكد من انه يورز وله صلاحيات 
//   graping بدل مقعد اكرر الكور في كل شئ اكتبه هنا مره واحده واعمل 
//to protect jobs