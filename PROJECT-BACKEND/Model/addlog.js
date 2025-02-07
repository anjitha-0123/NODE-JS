// import {Schema} from 'mongoose';
// import {model} from 'mongoose';
// const Demo1=new Schema({
//     status:{type:String,enum:['Completed','notComplete','cancelled'],default:'notCompleted'},
//     logs:{type:String,required:true},
//     title:{type:String,required:true},
//     description:{type:String},
//     targetdate:{type:String},
//     image:String
// });
// const sample1=model('addlog',Demo1)
// export {sample1}

import { Schema, model } from 'mongoose';

const Demo1 = new Schema({
    status: { type: String, enum: ['Completed', 'notComplete', 'cancelled'], default: 'notComplete' }, // ✅ Fixed default value
    logs: { type: String, required: true, trim: true }, 
    title: { type: String, required: true, trim: true }, 
    description: { type: String },
    targetdate: { type: String },
    image: String
});

const sample1 = model('addlog', Demo1);

export { sample1 };
