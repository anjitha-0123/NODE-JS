import {Schema} from 'mongoose';
import {model} from 'mongoose';
const Demo=new Schema({
    username:{type:String,required:true,unique:true},
    phonenumber:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userrole:{type:String,required:true}
});
const sample=model('signup',Demo)
export {sample}