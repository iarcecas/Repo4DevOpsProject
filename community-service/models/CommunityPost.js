import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const CommunityPostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['news', 'discussion'],
  },
  aiSummary: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

CommunityPostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


export default model('CommunityPost', CommunityPostSchema);