import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<ITodo>('Todo', todoSchema);