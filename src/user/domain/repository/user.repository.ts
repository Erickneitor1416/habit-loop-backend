import { User } from '@/user/domain';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findById(userId: string): Promise<User | null>;
  abstract update(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
