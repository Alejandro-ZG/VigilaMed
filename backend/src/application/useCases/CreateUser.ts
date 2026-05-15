import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const user = new User('', dto.name, dto.email, dto.password);
    return this.userRepository.create(user);
  }
}
