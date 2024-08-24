import { User, UserRepository } from '@/user/domain';

export class MemoryUserRepository extends UserRepository {
  private readonly users: User[];
  constructor() {
    super();
    this.users = [];
  }
  async findById(userId: string): Promise<User | null> {
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      return Promise.resolve(null);
    }
    return Promise.resolve(user);
  }
  async update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    if (!user) {
      return Promise.resolve(null);
    }
    return Promise.resolve(user);
  }
}
