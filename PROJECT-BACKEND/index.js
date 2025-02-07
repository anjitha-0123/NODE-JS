import express,{json} from 'express';
import dotenv from 'dotenv';
import { userauth } from './Routes/userauth.js';
import { adminauth } from './Routes/adminauth.js';
import mongoose from 'mongoose';
dotenv.config();
const app=express();
app.use(json())
app.use('/',userauth)
app.use('/',adminauth)

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`);
    
})
mongoose.connect("mongodb://localhost:27017/BucketList").then(()=>{
    console.log("MONGODB Connected Successfully to BucketList Application");
})
.catch((error)=>{
    console.error("MongoDB connection failed",error);
});