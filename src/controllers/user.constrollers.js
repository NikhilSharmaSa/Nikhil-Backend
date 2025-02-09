import asyncHandler from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
const registerUser=asyncHandler(async(req,res)=>{
   //get user details from frontend
   //validation--not empty
   //check if user already exist:from username or email
   //check for images 
   //check for avatar
   //upload them to clodinary,avatar
   //create user object-create entry in db
   //remove password and refresh token field from response
   //check for user creation 
   //return response




   // get user details
const {fullname,email,username,password}=req.body;




if([username,fullname,email,password].some((field)=>field?.trim()==="")){
throw new ApiError(400,"All fileds are required")
}

const userExisted=User.findOne({$or:[{email},username]});

if(userExisted) throw new ApiError(409,"user id already existed please use different username or password")

  const avatarLocalPath=  req.files?.avatar[0]?.path;
 const coverImageLocalPath= req.files?.coverImage[0]?.path;
 if(!avatarLocalPath) throw new ApiError(400,"Avatar is mandatory")

  const avatar= await uploadOnCloudinary(avatarLocalPath)
  const coverImage= await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar) throw new ApiError(400,"Avatar file is required");


const user= await User.create({
    fullname,
    email,
    password,
    coverImage:coverImage?.url || "",
    avatar:avatar.url,
    username:username.tolowerCase()

})


const createdUser=User.findById(user._id).select("-password -refreshToken")
if(!createdUser) throw new ApiError(500,"Something Went Wrong while creating a user!")
res.status(201).res.json(new ApiResponse(200,createdUser,"User Created SuccessFully!"))
})



const loginUser=asyncHandler(async(req,res)=>{

 if(1){
  res.send( new ApiResponse(400,{message:"hello user"}))
 }else{
  res.send( new ApiError(500,"Error Occured"))
 }
})
export { registerUser,loginUser}