import { User } from '@/user/domain';

export abstract class AuthService {
  abstract login(user: User): Promise<string> | string;
  abstract register(user: User): Promise<string> | string;
  abstract verify(
    token: string,
  ): Promise<object> | object | Promise<void> | void;
}
