import Injectable from '@/src/IoC/dependency-injector';
import {
  AuthService,
  UserRepository,
  UserUnauthorizedError,
} from '@/user/domain';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    const hashedPassword = await this.authService.hashPassword(password);

    if (!user || user.password !== hashedPassword) {
      throw new UserUnauthorizedError();
    }
    const token = await this.authService.login(user);
    return {
      user,
      token,
    };
  }
}
