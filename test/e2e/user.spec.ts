import { PrismaService } from '@/src/shared/prisma-client';
import { AuthService, UserRepository } from '@/src/user/domain';
import { MemoryUserRepository } from '@/src/user/infrastructure';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { PrismaServiceMock } from 'test/mocks/prisma-service.mock';

describe('User', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useClass(MemoryUserRepository)
      .overrideProvider(PrismaService)
      .useClass(PrismaServiceMock)
      .overrideProvider(AuthService)
      .useValue({
        register: jest.fn(),
      })
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

  it('/POST register', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        email: 'user@example.com',
        name: 'User',
        password: 'password',
      });
    expect(response.status).toBe(201);
  });
});
