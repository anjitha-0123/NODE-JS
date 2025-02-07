import {Schema} from 'mongoose';
import {model} from 'mongoose';
const Demo3=new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
});
const sample3=model('adminsignup',Demo3)
export {sample3}