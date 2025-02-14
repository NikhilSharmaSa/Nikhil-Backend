import { Router } from "express";
import { registerUser,loginUser, logoutUser,refreshAccessToken } from "../controllers/user.constrollers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const userRouter=Router()

userRouter.route("/register").post(
    upload.fields([{
        name:"avatar",
        maxCount:1
    },{name:"coverImage",
        maxCount:1
    }]),
    registerUser
)
userRouter.route("/login").post(loginUser)


//secured Routes
userRouter.route("/logout").post(verifyJWT,logoutUser);
userRouter.route("/refres-token").post(refreshAccessToken)


export default userRouter