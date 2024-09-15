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
    if (
      !user ||
      !(await this.authService.comparePasswords(password, user.password))
    ) {
      throw new UserUnauthorizedError();
    }
    const token = await this.authService.login(user);
    return token;
  }
}
