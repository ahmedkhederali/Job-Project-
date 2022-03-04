const User=require("../models/User")
const {StatusCodes} =require('http-status-codes')
const {BadRequestError,UnauthenticatedError} =require("../errors/index")
const register = async (req, res) => {
    const user=await User.create({...req.body})
    res
    .status(StatusCodes.CREATED)
    .json({user:{name:user.getName(),email:user.email},token:user.createToken()})
}
const login =async(req,res)=>{
   const {email,password}=req.body;
   if(!email || !password){
       throw new BadRequestError('please Enter Email and Password')
}
const user=await User.findOne({email})

if(!user){
    throw new UnauthenticatedError("Invalid Credential")
}
// to chech password is matched or not
const isPasswordCorrect=await user.comparePassword(password)
if(!isPasswordCorrect){
    throw new UnauthenticatedError("Invalid Credential")
}
//create token
const token=user.createToken();
res.status(StatusCodes.OK).json({user:{name:user.getName()},token})
}
module.exports={register,login}