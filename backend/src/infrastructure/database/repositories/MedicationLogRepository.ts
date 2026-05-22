import { IMedicationLogRepository } from '../../../domain/repositories/IMedicationLogRepository';
import { MedicationLog } from '../../../domain/entities/MedicationLog';
import { MedicationLogModel } from '../models/MedicationLogModel';

export class MedicationLogRepository implements IMedicationLogRepository {
  async create(log: MedicationLog): Promise<MedicationLog> {
    const created = await MedicationLogModel.create({
      scheduleId: log.scheduleId,
      patientId: log.patientId,
      timestamp: log.timestamp,
      confirmed: log.confirmed,
      response: log.response,
    });

    return new MedicationLog(
      created.id,
      created.scheduleId,
      created.patientId,
      created.timestamp,
      created.confirmed,
      created.response
    );
  }

  async findById(id: string): Promise<MedicationLog | null> {
    const found = await MedicationLogModel.findById(id).exec();
    return found
      ? new MedicationLog(
          found.id,
          found.scheduleId,
          found.patientId,
          found.timestamp,
          found.confirmed,
          found.response
        )
      : null;
  }

  async findByPatientId(patientId: string): Promise<MedicationLog[]> {
    const found = await MedicationLogModel.find({ patientId }).exec();
    return found.map(
      (l) =>
        new MedicationLog(
          l.id,
          l.scheduleId,
          l.patientId,
          l.timestamp,
          l.confirmed,
          l.response
        )
    );
  }

  async findByScheduleId(scheduleId: string): Promise<MedicationLog[]> {
    const found = await MedicationLogModel.find({ scheduleId }).exec();
    return found.map(
      (l) =>
        new MedicationLog(
          l.id,
          l.scheduleId,
          l.patientId,
          l.timestamp,
          l.confirmed,
          l.response
        )
    );
  }

  async update(id: string, log: Partial<MedicationLog>): Promise<MedicationLog | null> {
    const updated = await MedicationLogModel.findByIdAndUpdate(id, log, {
      new: true,
    }).exec();
    return updated
      ? new MedicationLog(
          updated.id,
          updated.scheduleId,
          updated.patientId,
          updated.timestamp,
          updated.confirmed,
          updated.response
        )
      : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await MedicationLogModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
