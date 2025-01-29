import express,{json} from "express";
import dotenv from "dotenv";
import {userauth} from "./Routes/userauth.js";
import {adminauth} from "./Routes/adminauth.js"

const app=express();
dotenv.config();

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
});
app.use(json())
app.use("/",userauth)
app.use("/",adminauth)
