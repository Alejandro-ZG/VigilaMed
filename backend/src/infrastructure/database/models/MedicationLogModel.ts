import mongoose, { Schema, model, Document } from 'mongoose';

export interface IMedicationLogDocument extends Document {
  scheduleId: string;
  patientId: string;
  timestamp: Date;
  confirmed: boolean;
  response?: string; // "Sí", "No", "No respondió"
}

const MedicationLogSchema = new Schema<IMedicationLogDocument>(
  {
    scheduleId: { type: String, required: true },
    patientId: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    confirmed: { type: Boolean, required: true },
    response: { type: String }, // "Sí", "No", "No respondió"
  },
  { timestamps: true }
);

export const MedicationLogModel = model<IMedicationLogDocument>('MedicationLog', MedicationLogSchema);
