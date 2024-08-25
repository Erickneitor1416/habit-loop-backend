import { AuthService, User } from '@/user/domain';
import { JwtService } from '@nestjs/jwt';
import Injectable from 'src/IoC/dependency-injector';
@Injectable()
export class JWTAuthService extends AuthService {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  async register(user: User): Promise<string> {
    return await this.generateToken(user);
  }
  login(user: User): Promise<string> {
    throw new Error(`Method not implemented.${user.name}`);
  }
  private async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
