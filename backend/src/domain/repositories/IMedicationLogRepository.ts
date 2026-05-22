import { MedicationLog } from '../entities/MedicationLog';

export interface IMedicationLogRepository {
  create(log: MedicationLog): Promise<MedicationLog>;
  findById(id: string): Promise<MedicationLog | null>;
  findByPatientId(patientId: string): Promise<MedicationLog[]>;
  findByScheduleId(scheduleId: string): Promise<MedicationLog[]>;
  update(id: string, log: Partial<MedicationLog>): Promise<MedicationLog | null>;
  delete(id: string): Promise<boolean>;
}
