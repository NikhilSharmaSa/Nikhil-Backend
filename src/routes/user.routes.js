import { Router } from "express";
import { registerUser,loginUser } from "../controllers/user.constrollers.js";
import { upload } from "../middlewares/multer.middlewares.js";
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

export default userRouter