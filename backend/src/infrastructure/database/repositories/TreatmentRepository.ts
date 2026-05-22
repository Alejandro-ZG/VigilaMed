import { ITreatmentRepository } from '../../../domain/repositories/ITreatmentRepository';
import { Treatment } from '../../../domain/entities/Treatment';
import { TreatmentModel } from '../models/TreatmentModel';

export class TreatmentRepository implements ITreatmentRepository {
  async create(treatment: Treatment): Promise<Treatment> {
    const created = await TreatmentModel.create({
      patientId: treatment.patientId,
      medicationName: treatment.medicationName,
      dosage: treatment.dosage,
      startDate: treatment.startDate,
      endDate: treatment.endDate,
      notes: treatment.notes,
    });

    return new Treatment(
      created.id,
      created.patientId,
      created.medicationName,
      created.dosage,
      created.startDate,
      created.endDate,
      created.notes
    );
  }

  async findById(id: string): Promise<Treatment | null> {
    const found = await TreatmentModel.findById(id).exec();
    return found
      ? new Treatment(
          found.id,
          found.patientId,
          found.medicationName,
          found.dosage,
          found.startDate,
          found.endDate,
          found.notes
        )
      : null;
  }

  async findByPatientId(patientId: string): Promise<Treatment[]> {
    const found = await TreatmentModel.find({ patientId }).exec();
    return found.map(
      (t) =>
        new Treatment(
          t.id,
          t.patientId,
          t.medicationName,
          t.dosage,
          t.startDate,
          t.endDate,
          t.notes
        )
    );
  }

  async update(id: string, treatment: Partial<Treatment>): Promise<Treatment | null> {
    const updated = await TreatmentModel.findByIdAndUpdate(id, treatment, {
      new: true,
    }).exec();
    return updated
      ? new Treatment(
          updated.id,
          updated.patientId,
          updated.medicationName,
          updated.dosage,
          updated.startDate,
          updated.endDate,
          updated.notes
        )
      : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await TreatmentModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
