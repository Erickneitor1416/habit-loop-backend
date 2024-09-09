import { AuthService, User } from '@/user/domain';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import Injectable from 'src/IoC/dependency-injector';

@Injectable()
export class JWTAuthService extends AuthService {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }
  async register(user: User): Promise<string> {
    return await this.generateToken(user);
  }
  async login(user: User): Promise<string> {
    return await this.generateToken(user);
  }
  private async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
  async verify(token: string): Promise<{ email: string; sub: string }> {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET ?? 'secret',
    });
  }
}
