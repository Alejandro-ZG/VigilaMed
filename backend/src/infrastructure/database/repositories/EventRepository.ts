import { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { Event } from '../../../domain/entities/Event';
import { EventModel } from '../models/EventModel';

export class EventRepository implements IEventRepository {
  async create(event: Event): Promise<Event> {
    const created = await EventModel.create({
      title: event.title,
      description: event.description,
      date: event.date,
      userId: event.userId,
    });

    return new Event(created.id, created.title, created.description, created.date, created.userId);
  }

  async findById(id: string): Promise<Event | null> {
    const found = await EventModel.findById(id).exec();
    return found ? new Event(found.id, found.title, found.description, found.date, found.userId) : null;
  }
}
