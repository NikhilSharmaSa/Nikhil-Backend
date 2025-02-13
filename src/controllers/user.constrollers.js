import asyncHandler from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'


const generateBothTokens=async(userId)=>{
try{
const user=await User.findById(userId)
const accessToken= await user.generateAccessToken()
const refreshToken= await user.generateRefreshToken()
user.refreshToken=refreshToken
 await user.save({validateBeforeSave:false});

return {accessToken,refreshToken};

}catch(error){
throw new ApiError(500,error)
}
}



//Register User Functionality



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
const {fullName,email,username,password}=req.body;




if([username,fullName,email,password].some((field)=>field?.trim()==="")){
throw new ApiError(400,"All fileds are required")
}
const userExisted = await User.findOne({
    $or: [{ email: email }, { username: username }]
  });

if(userExisted){
    
 throw new ApiError(409,"user id already existed please use different username or password")
}

  const avatarLocalPath= req.files?.avatar[0]?.path;
 const coverImageLocalPath= req.files?.coverImage[0]?.path;
 if(!avatarLocalPath) throw new ApiError(400,"Avatar is mandatory")

  const avatar=await  uploadOnCloudinary(avatarLocalPath)
  const coverImage= await uploadOnCloudinary(coverImageLocalPath)
  if(!avatar) {
    throw new ApiError(400,"Avatar file is required");
  }


const user= await User.create({
    fullName,
    email,
    password,
    coverImage:coverImage?.url || "",
    avatar:avatar.url,
    username:username.toLowerCase()

})


const createdUser= await User.findById(user._id).select("-password -refreshToken")
if(!createdUser) throw new ApiError(500,"Something Went Wrong while creating a user!")
   
    res.status(201).json(new ApiResponse(200, createdUser, "User Created Successfully!"));

})


//login User Functionality














const loginUser=asyncHandler(async(req,res)=>{
//req-body
//username or email check 
//find the user
//password check 
//access token / refresh token 
//send cookie
//send res to user that you are login 

const {email,username,password}=req.body;

if(!username && !email) {
    throw new ApiError(400,"Username or email is required!")
}

    const user=await User.findOne({
        $or:[{email},{username}]
    })
if(!user)throw new ApiError(400,"User does Not Exist");

const isPassValid=await user.isPasswordCorrect(password)

if(!isPassValid)throw new ApiError(400,"Invalid User Credentials")
const {accessToken,refreshToken}=await generateBothTokens(user._id)
const logedInUser=await User.findById(user._id).select("-password -refreshToken")

const options={
    httpOnly:true,
    secure:true
}
 res.status(201).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{user:logedInUser,accessToken:accessToken,refreshToken:refreshToken},"User Logged In SuccessFully!"))

})



//logout functionality of user 


const logoutUser= asyncHandler(async(req,res)=>{
    
 await User.findByIdAndUpdate(req.user._id,{
    $set:{
        refreshToken:undefined
    }
})

const options={
    httpOnly:true,
    secure:true
}

res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(
    200,
    {},
    "User Logout Successfully"
))

})
export { registerUser,loginUser,logoutUser}