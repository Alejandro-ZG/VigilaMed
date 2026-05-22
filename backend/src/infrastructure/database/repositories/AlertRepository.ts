import { IAlertRepository } from '../../../domain/repositories/IAlertRepository';
import { Alert } from '../../../domain/entities/Alert';
import { AlertModel } from '../models/AlertModel';

export class AlertRepository implements IAlertRepository {
  async create(alert: Alert): Promise<Alert> {
    const created = await AlertModel.create({
      medicationLogId: alert.medicationLogId,
      telegramChatId: alert.telegramChatId,
      sentAt: alert.sentAt,
      status: alert.status,
      messageId: alert.messageId,
    });

    return new Alert(
      created.id,
      created.medicationLogId,
      created.telegramChatId,
      created.sentAt,
      created.status,
      created.messageId
    );
  }

  async findById(id: string): Promise<Alert | null> {
    const found = await AlertModel.findById(id).exec();
    return found
      ? new Alert(
          found.id,
          found.medicationLogId,
          found.telegramChatId,
          found.sentAt,
          found.status,
          found.messageId
        )
      : null;
  }

  async findByStatus(status: 'pending' | 'sent' | 'failed'): Promise<Alert[]> {
    const found = await AlertModel.find({ status }).exec();
    return found.map(
      (a) =>
        new Alert(
          a.id,
          a.medicationLogId,
          a.telegramChatId,
          a.sentAt,
          a.status,
          a.messageId
        )
    );
  }

  async update(id: string, alert: Partial<Alert>): Promise<Alert | null> {
    const updated = await AlertModel.findByIdAndUpdate(id, alert, {
      new: true,
    }).exec();
    return updated
      ? new Alert(
          updated.id,
          updated.medicationLogId,
          updated.telegramChatId,
          updated.sentAt,
          updated.status,
          updated.messageId
        )
      : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await AlertModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
