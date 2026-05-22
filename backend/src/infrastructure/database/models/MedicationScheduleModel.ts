import mongoose, { Schema, model, Document } from 'mongoose';

export interface IMedicationScheduleDocument extends Document {
  treatmentId: string;
  time: string; // Formato HH:mm (ej: "08:30")
  daysOfWeek: number[]; // 0-6 (domingo-sábado)
  active: boolean;
}

const MedicationScheduleSchema = new Schema<IMedicationScheduleDocument>(
  {
    treatmentId: { type: String, required: true },
    time: { type: String, required: true }, // HH:mm format
    daysOfWeek: { type: [Number], required: true }, // 0-6 for Sunday-Saturday
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const MedicationScheduleModel = model<IMedicationScheduleDocument>(
  'MedicationSchedule',
  MedicationScheduleSchema
);
