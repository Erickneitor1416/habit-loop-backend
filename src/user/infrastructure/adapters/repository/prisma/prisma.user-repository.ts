import { PrismaService } from '@/shared/prisma-client';
import { User, UserRepository } from '@/user/domain';
import { User as PrismaUser } from '@prisma/client';
import Injectable from 'src/IoC/dependency-injector';
@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async findByEmail(email: string): Promise<User | null> {
    const prismaUser: PrismaUser | null = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!prismaUser) {
      return null;
    }
    return this.toDomain(prismaUser);
  }
  async save(user: User): Promise<User> {
    const prismaUser: PrismaUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });
    return this.toDomain(prismaUser);
  }

  findById(userId: string): Promise<User | null> {
    throw new Error(`Method not implemented.${userId}`);
  }
  update(user: User): Promise<void> {
    throw new Error(`Method not implemented.${user.name}`);
  }

  private toDomain(user: PrismaUser): User {
    return new User(user.name, user.email, user.password, user.id);
  }
}
