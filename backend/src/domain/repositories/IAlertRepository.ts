import { Alert } from '../entities/Alert';

export interface IAlertRepository {
  create(alert: Alert): Promise<Alert>;
  findById(id: string): Promise<Alert | null>;
  findByStatus(status: 'pending' | 'sent' | 'failed'): Promise<Alert[]>;
  update(id: string, alert: Partial<Alert>): Promise<Alert | null>;
  delete(id: string): Promise<boolean>;
}
