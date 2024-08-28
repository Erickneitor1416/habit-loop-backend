import { PrismaService } from '@/src/shared/prisma-client';

export class PrismaServiceMock extends PrismaService {
  async onModuleInit() {}
  async onModuleDestroy() {}
}
