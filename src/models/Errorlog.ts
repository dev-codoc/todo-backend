import mongoose, { Document, Schema } from 'mongoose';

export interface IErrorLog extends Document {
  message: string;
  stack?: string;
  route: string;
  method: string;
  statusCode: number;
  user?: mongoose.Types.ObjectId;
}

const errorLogSchema = new Schema<IErrorLog>({
  message: { type: String, required: true },
  stack: String,
  route: { type: String, required: true },
  method: { type: String, required: true },
  statusCode: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model<IErrorLog>('ErrorLog', errorLogSchema);
