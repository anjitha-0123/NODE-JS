import express,{json} from "express";
import dotenv from "dotenv";
import {userauth} from "./Routes/userauth.js";
import {adminauth} from "./Routes/adminauth.js"
import cors from 'cors';

const app=express();
dotenv.config();
app.use(cors({
    origin: 'http://127.0.0.1:5500',    
    credentials:true
 }))

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
});
app.use(json())
app.use("/",userauth)
app.use("/",adminauth)
