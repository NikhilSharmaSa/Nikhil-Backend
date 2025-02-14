import dotenv from 'dotenv'
dotenv.config({path:'./env'})
import connectDB from './db/db.js';
import { app } from './app.js';

connectDB()
.then(()=>{
    app.on("Error Occurred",(error)=>{
        console.log("Error Occurred:"+error)
        throw error
    })


    app.listen(process.env.PORT || 8000,()=>{
        console.log(`app is listing at ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed "+ error)
})





































// import express from 'express'
// const app=express();
// ;(async()=>{

//     try{
//      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
// app.on("error",(error)=>{
//     console.log("Error",error)
//     throw error
// })


// app.listen(process.env.PORT,()=>{
//     console.log(`App is listining at ${process.env.PORT}`)
// })

//     }
//     catch(err){
//         console.log("Error",err)
//         throw err
//     }
// })()


