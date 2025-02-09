import {Schema} from 'mongoose';
import {model} from 'mongoose';
const CommentSchema=new Schema({
   content:{type:String,required:true},
   user:{type:Schema.Types.ObjectId,ref:"signup",required:true},
   post:{type:Schema.Types.ObjectId,ref:"addinspiration",required:true}
});
const usercomment=model('addComment',CommentSchema)
export {usercomment}