import express,{json} from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import {userauth1} from "./Routes1/userauth1.js";
import { adminauth } from "./Routes1/adminauth.js";
import cors from 'cors';
dotenv.config();
const app=express();

app.use(cors({
    origin:'*',//'http://127.0.0.1:5500',
    credentials:true
}))

app.use(json())
//app.use(cookieParser());
app.use("/",userauth1)
app.use('/',adminauth)

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
});



