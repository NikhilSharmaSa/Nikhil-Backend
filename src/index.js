import dotenv from 'dotenv'
dotenv.config({path:'./env'})
import connectDB from './db/db.js';

connectDB();





































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


