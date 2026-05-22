export class Alert {
  constructor(
    public id: string,
    public medicationLogId: string,
    public telegramChatId: string,
    public sentAt: Date,
    public status: 'pending' | 'sent' | 'failed',
    public messageId?: string
  ) {}
}
