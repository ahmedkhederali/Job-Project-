const mongoose = require("mongoose");
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true, // to delete space from start and end,
    minlength: 3,
    maxlength: [20, "Can't be more than 20 character"],
  },
  email: {
    type: String,
    tirm: true,
    required: [true, "must provide name"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    equired: [true, "must provide name"],
    trim: true, // to delete space from start and end,
    minlength: 6,
  },
});
// لتشفير الباسورد 
//Pre middleware functions are executed one after another, when each middleware calls next.
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// to get name
UserSchema.methods.getName=function(){
    return this.name
}
// to Create token 
UserSchema.methods.createToken=function(){
    const token=jwt.sign({userID:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
    return token
}

// to Compare password 
UserSchema.methods.comparePassword=async function(candidatePassword){
  const isMatch=await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}

module.exports = mongoose.model("User", UserSchema);
