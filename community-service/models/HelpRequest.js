import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const HelpRequestSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  volunteers: [{
    type: Schema.Types.ObjectId,
    ref: 'User', 
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

HelpRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('HelpRequest', HelpRequestSchema);