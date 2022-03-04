const express=require('express')
const router=express.Router()
const {getAllJobs,getJob,updateJob,deleteJob,createJob}=require('../controllers/jobs')


router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)
module.exports=router