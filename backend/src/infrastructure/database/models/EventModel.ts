import mongoose, { Schema, model, Document } from 'mongoose';

export interface IEventDocument extends Document {
  title: string;
  description: string;
  date: Date;
  userId: string;
}

const EventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const EventModel = model<IEventDocument>('Event', EventSchema);
