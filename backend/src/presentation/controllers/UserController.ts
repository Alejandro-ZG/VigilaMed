import { Request, Response } from 'express';
import { CreateUser } from '../../application/useCases/CreateUser';
import { UserRepository } from '../../infrastructure/database/repositories/UserRepository';
import { JsonView } from '../views/JsonView';

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const createUser = new CreateUser(new UserRepository());
      const user = await createUser.execute({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      return JsonView.created(res, user, 'Usuario creado');
    } catch (error) {
      return JsonView.error(res, error, 400);
    }
  }
}
