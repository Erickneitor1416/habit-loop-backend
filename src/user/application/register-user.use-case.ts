import {
  AuthService,
  User,
  UserAlreadyExistsError,
  UserRepository,
} from '@/user/domain';
import Injectable from 'src/IoC/dependency-injector';
@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(user: User) {
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);
    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    user.password = await this.hashPassword(user.password);
    const savedUser = await this.userRepository.save(user);
    return {
      user: savedUser,
      accessToken: await this.authService.register(savedUser),
    };
  }
  private async hashPassword(password: string): Promise<string> {
    return await this.authService.hashPassword(password);
  }
}
