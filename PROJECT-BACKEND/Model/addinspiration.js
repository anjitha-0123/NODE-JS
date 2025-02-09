import {Schema} from 'mongoose';
import {model} from 'mongoose';
const InspirationSchema=new Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String},
    image:String
    });
const postmodel=model('addinspiration',InspirationSchema)
export {postmodel}