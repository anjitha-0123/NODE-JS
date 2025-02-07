import {Schema} from 'mongoose';
import {model} from 'mongoose';
const Demo2=new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    bio:{type:String},
    image:String
});
const sample2=model('addProfile',Demo2)
export {sample2}