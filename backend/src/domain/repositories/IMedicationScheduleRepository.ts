import { MedicationSchedule } from '../entities/MedicationSchedule';

export interface IMedicationScheduleRepository {
  create(schedule: MedicationSchedule): Promise<MedicationSchedule>;
  findById(id: string): Promise<MedicationSchedule | null>;
  findByTreatmentId(treatmentId: string): Promise<MedicationSchedule[]>;
  update(id: string, schedule: Partial<MedicationSchedule>): Promise<MedicationSchedule | null>;
  delete(id: string): Promise<boolean>;
  findActive(): Promise<MedicationSchedule[]>;
}
