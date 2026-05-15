import { Request, Response } from 'express';
import { ScheduleEvent } from '../../application/useCases/ScheduleEvent';
import { EventRepository } from '../../infrastructure/database/repositories/EventRepository';
import { JsonView } from '../views/JsonView';

export class EventController {
  static async schedule(req: Request, res: Response) {
    try {
      const scheduleEvent = new ScheduleEvent(new EventRepository());
      const event = await scheduleEvent.execute({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        userId: req.body.userId,
      });

      return JsonView.created(res, event, 'Evento agendado');
    } catch (error) {
      return JsonView.error(res, error, 400);
    }
  }
}
