import { PrismaService } from '@/src/shared/prisma-client';
import {
  MemoryUserRepository,
  PrismaUserRepository,
} from '@/src/user/infrastructure';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';
import { AppModule } from 'src/app.module';
import request from 'supertest';

describe('Health', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaUserRepository)
      .useClass(MemoryUserRepository)
      .overrideProvider(PrismaService)
      .useClass(
        class PrismaServiceMock extends PrismaService {
          async onModuleInit() {}
          async onModuleDestroy() {}
        },
      )
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(async () => {
    await app.close();
    nock.enableNetConnect();
  });

  it('/GET health', async () => {
    const response = await request(app.getHttpServer()).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
