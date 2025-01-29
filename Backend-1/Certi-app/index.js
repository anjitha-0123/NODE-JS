import express,{json} from "express";
import dotenv from "dotenv";
import {userauth1} from "./Routes1/userauth1.js";
import {adminauth} from "./Routes1/adminauth.js";

const app=express();
dotenv.config();

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
});
app.use(json())
app.use("/",userauth1)
app.use("/",adminauth)

