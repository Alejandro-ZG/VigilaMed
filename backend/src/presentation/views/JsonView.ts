import { Response } from 'express';

export class JsonView {
  static success(res: Response, data: unknown, message = 'OK') {
    return res.status(200).json({ message, data });
  }

  static created(res: Response, data: unknown, message = 'Creado correctamente') {
    return res.status(201).json({ message, data });
  }

  static error(res: Response, error: unknown, status = 400) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(status).json({ message, error });
  }
}
