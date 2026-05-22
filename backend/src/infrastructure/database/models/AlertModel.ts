import mongoose, { Schema, model, Document } from 'mongoose';

export interface IAlertDocument extends Document {
  medicationLogId: string;
  telegramChatId: string;
  sentAt: Date;
  status: 'pending' | 'sent' | 'failed';
  messageId?: string;
}

const AlertSchema = new Schema<IAlertDocument>(
  {
    medicationLogId: { type: String, required: true },
    telegramChatId: { type: String, required: true },
    sentAt: { type: Date, required: true, default: Date.now },
    status: { 
      type: String, 
      enum: ['pending', 'sent', 'failed'],
      default: 'pending'
    },
    messageId: { type: String },
  },
  { timestamps: true }
);

export const AlertModel = model<IAlertDocument>('Alert', AlertSchema);
