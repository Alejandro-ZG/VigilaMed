import { IMedicationScheduleRepository } from '../../../domain/repositories/IMedicationScheduleRepository';
import { MedicationSchedule } from '../../../domain/entities/MedicationSchedule';
import { MedicationScheduleModel } from '../models/MedicationScheduleModel';

export class MedicationScheduleRepository implements IMedicationScheduleRepository {
  async create(schedule: MedicationSchedule): Promise<MedicationSchedule> {
    const created = await MedicationScheduleModel.create({
      treatmentId: schedule.treatmentId,
      time: schedule.time,
      daysOfWeek: schedule.daysOfWeek,
      active: schedule.active,
    });

    return new MedicationSchedule(
      created.id,
      created.treatmentId,
      created.time,
      created.daysOfWeek,
      created.active
    );
  }

  async findById(id: string): Promise<MedicationSchedule | null> {
    const found = await MedicationScheduleModel.findById(id).exec();
    return found
      ? new MedicationSchedule(
          found.id,
          found.treatmentId,
          found.time,
          found.daysOfWeek,
          found.active
        )
      : null;
  }

  async findByTreatmentId(treatmentId: string): Promise<MedicationSchedule[]> {
    const found = await MedicationScheduleModel.find({ treatmentId }).exec();
    return found.map(
      (s) =>
        new MedicationSchedule(
          s.id,
          s.treatmentId,
          s.time,
          s.daysOfWeek,
          s.active
        )
    );
  }

  async update(id: string, schedule: Partial<MedicationSchedule>): Promise<MedicationSchedule | null> {
    const updated = await MedicationScheduleModel.findByIdAndUpdate(id, schedule, {
      new: true,
    }).exec();
    return updated
      ? new MedicationSchedule(
          updated.id,
          updated.treatmentId,
          updated.time,
          updated.daysOfWeek,
          updated.active
        )
      : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await MedicationScheduleModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findActive(): Promise<MedicationSchedule[]> {
    const found = await MedicationScheduleModel.find({ active: true }).exec();
    return found.map(
      (s) =>
        new MedicationSchedule(
          s.id,
          s.treatmentId,
          s.time,
          s.daysOfWeek,
          s.active
        )
    );
  }
}
