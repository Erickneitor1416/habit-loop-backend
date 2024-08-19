import { User } from '@/user/domain';

export abstract class AuthService {
  abstract login(user: User): Promise<string>;
  abstract register(user: User): Promise<string>;
  abstract validateUser(user: User): Promise<boolean>;
}
