import { IPatientRepository } from '../../../domain/repositories/IPatientRepository';
import { Patient } from '../../../domain/entities/Patient';
import { PatientModel } from '../models/PatientModel';

export class PatientRepository implements IPatientRepository {
  async create(patient: Patient): Promise<Patient> {
    const created = await PatientModel.create({
      name: patient.name,
      age: patient.age,
      medicalHistory: patient.medicalHistory,
      tutorId: patient.tutorId,
      telegramChatId: patient.telegramChatId,
    });

    return new Patient(
      created.id,
      created.name,
      created.age,
      created.tutorId,
      created.medicalHistory,
      created.telegramChatId
    );
  }

  async findById(id: string): Promise<Patient | null> {
    const found = await PatientModel.findById(id).exec();
    return found
      ? new Patient(
          found.id,
          found.name,
          found.age,
          found.tutorId,
          found.medicalHistory,
          found.telegramChatId
        )
      : null;
  }

  async findByTutorId(tutorId: string): Promise<Patient[]> {
    const found = await PatientModel.find({ tutorId }).exec();
    return found.map(
      (p) =>
        new Patient(
          p.id,
          p.name,
          p.age,
          p.tutorId,
          p.medicalHistory,
          p.telegramChatId
        )
    );
  }

  async update(id: string, patient: Partial<Patient>): Promise<Patient | null> {
    const updated = await PatientModel.findByIdAndUpdate(id, patient, {
      new: true,
    }).exec();
    return updated
      ? new Patient(
          updated.id,
          updated.name,
          updated.age,
          updated.tutorId,
          updated.medicalHistory,
          updated.telegramChatId
        )
      : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await PatientModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
