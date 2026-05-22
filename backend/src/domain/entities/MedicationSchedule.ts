export class MedicationSchedule {
  constructor(
    public id: string,
    public treatmentId: string,
    public time: string, // HH:mm format
    public daysOfWeek: number[], // 0-6 (Sunday-Saturday)
    public active: boolean = true
  ) {}
}
