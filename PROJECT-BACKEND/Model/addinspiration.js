import {Schema} from 'mongoose';
import {model} from 'mongoose';
const Demo3=new Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String},
    image:String
    
    });
const sample3=model('addinspiration',Demo3)
export {sample3}