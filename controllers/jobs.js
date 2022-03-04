const Job=require("../models/Job")
const { StatusCodes } = require('http-status-codes')
const {NotFoundError,BadRequestError} = require("../errors/index")
const getAllJobs=async (req,res)=>{
    // جبت كل الوظائف الخاصة بالعميل وليس كل الوظائف في العموم
    const jobs=await Job.find({createdBy:req.user.userID}).sort("createdAt");
    res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}
const getJob =async(req,res)=>{
    //console.log(req.params)   //{ id: '621ff08abb946229d4e1d62e' }
    // check by both value i can check by params only but this is strong 
    const job=await Job.findOne({_id:req.params.id,createdBy:req.user.userID})
    // we have to options for error 
    //1- if we change any valuse of id but still have the same number 
    //2-if increase or decrease number of letter of ID 
    if(!job){
        throw new NotFoundError("not Found Job With this ID")
    }
    res.status(StatusCodes.OK).json({job})
}
const createJob =async(req,res)=>{
    console.log(req.user.userID)
    req.body.createdBy= req.user.userID
    const job =await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob =async(req,res)=>{
    const {user:{userID} , params:{id}}=req;
    const job=await Job.findByIdAndUpdate({_id:id,createdBy:userID},req.body,{
        new:true,
        runValidators:true
    })
    if(!job){
        throw new NotFoundError("Not Found Job With This ID")
    }
    res.status(StatusCodes.OK).json({job})
    
}
const deleteJob =async(req,res)=>{
    const {user:{userID} , params:{id}}=req;
    const job=await Job.findByIdAndRemove({_id:id,createdBy:userID})
    if(!job){
        throw new NotFoundError("Not Found Job With This ID")
    }
    res.status(StatusCodes.OK).json({job})
}

module.exports={getAllJobs,getJob,updateJob,deleteJob,createJob}