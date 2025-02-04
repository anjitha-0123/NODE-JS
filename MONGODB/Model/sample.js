import { Schema } from "mongoose";
import{ model} from 'mongoose'
const Demo=new Schema({  //in demo schema is defining
    
    userid:{type:String,required:true},
    name:{type:String,required:true},
    dob:{type:String,required:true}
});
const sample=model('sample1',Demo) //sample1 is a collection name
export {sample}