import express from 'express';
import mongoose from 'mongoose';
import {router} from './Routes/routes.js';
import dotenv from 'dotenv'
 dotenv.config();

const app=express();
app.use(express.json());
app.use('/',router);
app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
})
mongoose.connect('mongodb://localhost:27017/Demo')//using connect method the db connect with backend programm