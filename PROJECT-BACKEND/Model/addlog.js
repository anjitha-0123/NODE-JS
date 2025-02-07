import {Schema} from 'mongoose';
import {model} from 'mongoose';
const Demo1=new Schema({
    status:{type:String,required:true},
    logs:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String},
    targetdate:{type:String},
    image:String
});
const sample1=model('addlog',Demo1)
export {sample1}