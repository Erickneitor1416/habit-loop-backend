import { PrismaService } from '@/src/shared/prisma-client';
import { AuthService, UserRepository } from '@/src/user/domain';
import { MemoryUserRepository } from '@/src/user/infrastructure';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { authServiceMock } from 'test/mocks/auth-service.mock';
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
      .useValue(authServiceMock)
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
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
  it('/POST register - invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        email: 'user',
        name: 'User',
        password: 'password',
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('email must be an email');
  });
  it('/POST register - empty name', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        email: 'user@example.com',
        name: '',
        password: 'password',
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('name should not be empty');
  });
  it('/POST register - empty password', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        email: 'user@example.com',
        name: 'User',
        password: '',
      });
    expect(response.body.message).toContain('password should not be empty');
  });
  it('/POST register - password too short', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        email: 'user@example.com',
        name: 'User',
        password: 'short',
      });
    expect(response.body.message).toContain(
      'password should be at least 8 characters',
    );
  });
  it('/POST login', async () => {
    const registerResponse = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        email: 'user@example2.com',
        name: 'User',
        password: 'password',
      });
    const response = await request(app.getHttpServer())
      .post('/user/login')
      .send({
        email: 'user@example2.com',
        password: 'password',
      });
    expect(registerResponse.status).toBe(201);
    expect(response.body.accessToken).toBeDefined();
  });
});
