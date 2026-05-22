export class Patient {
  constructor(
    public id: string,
    public name: string,
    public age: number,
    public tutorId: string,
    public medicalHistory?: string,
    public telegramChatId?: string
  ) {}
}
