import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = model<IUserDocument>('User', UserSchema);
