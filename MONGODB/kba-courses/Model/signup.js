import { Schema } from "mongoose";
import{ model} from 'mongoose'
const Demo=new Schema({  //in demo schema is defining
    firstname:String,
    lastname:String,
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userrole:{type:String,required:true}
    
});
const sample=model('signup',Demo) //sample1 is a collection name
export {sample}