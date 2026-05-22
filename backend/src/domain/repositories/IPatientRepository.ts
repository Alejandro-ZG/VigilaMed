import { Patient } from '../entities/Patient';

export interface IPatientRepository {
  create(patient: Patient): Promise<Patient>;
  findById(id: string): Promise<Patient | null>;
  findByTutorId(tutorId: string): Promise<Patient[]>;
  update(id: string, patient: Partial<Patient>): Promise<Patient | null>;
  delete(id: string): Promise<boolean>;
}
