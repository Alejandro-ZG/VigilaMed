import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { UserModel } from '../models/UserModel';

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return new User(created.id, created.name, created.email, created.password);
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email }).exec();
    return found ? new User(found.id, found.name, found.email, found.password) : null;
  }

  async findById(id: string): Promise<User | null> {
    const found = await UserModel.findById(id).exec();
    return found ? new User(found.id, found.name, found.email, found.password) : null;
  }
}
