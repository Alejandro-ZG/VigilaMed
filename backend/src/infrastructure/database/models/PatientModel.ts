import mongoose, { Schema, model, Document } from 'mongoose';

export interface IPatientDocument extends Document {
  name: string;
  age: number;
  medicalHistory?: string;
  tutorId: string;
  telegramChatId?: string;
}

const PatientSchema = new Schema<IPatientDocument>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    medicalHistory: { type: String },
    tutorId: { type: String, required: true },
    telegramChatId: { type: String },
  },
  { timestamps: true }
);

export const PatientModel = model<IPatientDocument>('Patient', PatientSchema);
