
import { Schema, model } from 'mongoose';

const logSchema = new Schema({
// status: { type: String, enum: ['Completed', 'notComplete', 'cancelled'], default: 'notComplete' }, 
    logs: { type: String, required: true, trim: true }, 
    title: { type: String, required: true, trim: true }, 
    description: { type: String },
    targetdate: { type: String },
    image: String
});

const loges = model('addlog', logSchema);

export { loges };
