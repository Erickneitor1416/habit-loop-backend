import { AuthGuard } from '@/src/auth/auth.guard';
import { Habit, HabitRepository } from '@/src/habit/domain';
import { MemoryHabitRepository } from '@/src/habit/infrastructure';
import { PrismaService } from '@/src/shared/prisma-client';
import { AuthService } from '@/src/user/domain';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { habitFactory } from 'test/factories/habit/habit.factory';
import { AuthGuardMock } from 'test/mocks/auth-guard.mock';
import { authServiceMock } from 'test/mocks/auth-service.mock';
import { PrismaServiceMock } from 'test/mocks/prisma-service.mock';

declare module 'http' {
  interface IncomingMessage {
    user?: { sub: string; email: string };
  }
}

describe(Habit, () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HabitRepository)
      .useClass(MemoryHabitRepository)
      .overrideProvider(AuthGuard)
      .useClass(AuthGuardMock)
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

  it('/POST save habit', async () => {
    const habit = habitFactory();
    const response = await request(app.getHttpServer())
      .post('/habit/create')
      .send({
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
        goal: habit.goal,
      });
    expect(response.status).toBe(201);
  });

  it('/POST save habit with invalid data', async () => {
    const response = await request(app.getHttpServer())
      .post('/habit/create')
      .send({
        name: 'a',
        description: 'a',
        frequency: 'a',
        goal: 0,
      });
    expect(response.status).toBe(400);
  });

  it('/GET find habits', async () => {
    const response = await request(app.getHttpServer()).get('/habit');
    expect(response.status).toBe(200);
  });

  it('/PUT update habit', async () => {
    const habit = habitFactory();
    await request(app.getHttpServer()).post('/habit/create').send({
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      goal: habit.goal,
      id: habit.id,
    });
    const response = await request(app.getHttpServer())
      .put('/habit/update')
      .send({
        name: habit.name,
        description: habit.description + ' updated',
        frequency: habit.frequency,
        goal: habit.goal,
        id: habit.id,
      });
    expect(response.status).toBe(200);
  });
});
