import { User, UserAlreadyExistsError, UserRepository } from '@/user/domain';
import { hash } from 'bcryptjs';
import Injectable from 'src/IoC/dependency-injector';
@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User) {
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);
    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    user.password = await this.hashPassword(user.password);
    return await this.userRepository.save(user);
  }
  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
