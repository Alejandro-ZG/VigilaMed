import mongoose, { Schema, model, Document } from 'mongoose';

export interface ITreatmentDocument extends Document {
  patientId: string;
  medicationName: string;
  dosage: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
}

const TreatmentSchema = new Schema<ITreatmentDocument>(
  {
    patientId: { type: String, required: true },
    medicationName: { type: String, required: true },
    dosage: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export const TreatmentModel = model<ITreatmentDocument>('Treatment', TreatmentSchema);
