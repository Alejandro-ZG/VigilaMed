import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { Event } from '../../domain/entities/Event';

export interface ScheduleEventDTO {
  title: string;
  description: string;
  date: string;
  userId: string;
}

export class ScheduleEvent {
  constructor(private eventRepository: IEventRepository) {}

  async execute(dto: ScheduleEventDTO): Promise<Event> {
    const event = new Event('', dto.title, dto.description, new Date(dto.date), dto.userId);
    return this.eventRepository.create(event);
  }
}
