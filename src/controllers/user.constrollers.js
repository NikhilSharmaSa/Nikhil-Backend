import asyncHandler from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'

const registerUser=asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})



const loginUser=asyncHandler(async(req,res)=>{

 if(1){
  res.send( new ApiResponse(400,{message:"hello user"}))
 }else{
  res.send( new ApiError(500,"Error Occured"))
 }
})
export { registerUser,loginUser}