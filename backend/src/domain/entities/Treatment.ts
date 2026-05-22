export class Treatment {
  constructor(
    public id: string,
    public patientId: string,
    public medicationName: string,
    public dosage: string,
    public startDate: Date,
    public endDate?: Date,
    public notes?: string
  ) {}
}
