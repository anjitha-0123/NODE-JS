import {Schema} from 'mongoose';
import {model} from 'mongoose';
const Demo4=new Schema({
   content:{type:String,required:true},
   user:{type:Schema.Types.ObjectId,ref:"signup",required:true},
   post:{type:Schema.Types.ObjectId,ref:"addinspiration",required:true}
});
const sample4=model('addComment',Demo4)
export {sample4}