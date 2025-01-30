import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
username:{
    type:String,
    required:true,
    lowercase:true,
},
email:{
    type:String,
    required:true,
    lowercase:true,
},
phone:{
    type:Number,
    required:true,

},
password:{
    type:String,
    required:true
},
address:{
    type:String,
    required:[true,"Please Enter a address"]
}

},{timestamps:true})

export const User=mongoose.model("User",userSchema);