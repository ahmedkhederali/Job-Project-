const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Must Provide Company Name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Must Provide position"],
    maxlength: 100,
  },
  statue:{
      type:String,
      enum:["interview","declined","pending"],
      default:'pending'
  },
  // very very important to tie job with actual user
  createdBy:{
      type:mongoose.Types.ObjectId,
      ref:'User',
      required:[true,'please Provide User']
  }
},{timestamps:true});

// the advantage of timestamps is when job created there is created to things
//"createdAt": "2022-03-02T22:34:43.525Z",
//"updatedAt": "2022-03-02T22:34:43.525Z",

module.exports=mongoose.model("Job",JobSchema);