export class MedicationLog {
  constructor(
    public id: string,
    public scheduleId: string,
    public patientId: string,
    public timestamp: Date,
    public confirmed: boolean,
    public response?: string // "Sí", "No", "No respondió"
  ) {}
}
