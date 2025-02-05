import { Schema } from "mongoose";
import {model} from 'mongoose';
const Demo1=new Schema({
    coursename:String,
    courseid:{type:String,required:true,unique:true},
    coursetype:String,
    description:String,
    Price:Number

});
const sample1=model('addcourse',Demo1)
export {sample1}