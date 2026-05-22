import { Treatment } from '../entities/Treatment';

export interface ITreatmentRepository {
  create(treatment: Treatment): Promise<Treatment>;
  findById(id: string): Promise<Treatment | null>;
  findByPatientId(patientId: string): Promise<Treatment[]>;
  update(id: string, treatment: Partial<Treatment>): Promise<Treatment | null>;
  delete(id: string): Promise<boolean>;
}
