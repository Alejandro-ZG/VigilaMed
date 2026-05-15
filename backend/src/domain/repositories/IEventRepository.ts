import { Event } from '../entities/Event';

export interface IEventRepository {
  create(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | null>;
}
