import { PrismaService } from '@/src/shared/prisma-client';
import {
  AuthService,
  UserAlreadyExistsError,
  UserRepository,
} from '@/src/user/domain';
import { RegisterUserUseCase } from '@/user/application';
import { MemoryUserRepository, UserModule } from '@/user/infrastructure';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { userFactory } from 'test/factories/user/user.factory';
import { authServiceMock } from 'test/mocks/auth-service.mock';
import { loggerServiceMock } from 'test/mocks/logger-service.mock';
import { PrismaServiceMock } from 'test/mocks/prisma-service.mock';

describe(RegisterUserUseCase, () => {
  let useCase: RegisterUserUseCase;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [{ provide: Logger, useValue: loggerServiceMock }],
    })
      .overrideProvider(UserRepository)
      .useClass(MemoryUserRepository)
      .overrideProvider(PrismaService)
      .useClass(PrismaServiceMock)
      .overrideProvider(AuthService)
      .useValue({
        ...authServiceMock,
        hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
      })
      .overrideProvider(Logger)
      .useValue(loggerServiceMock)
      .compile();
    useCase = moduleFixture.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should register a user', async () => {
    const user = userFactory();
    const passwordWithoutHash = user.password;
    const registeredUser = await useCase.execute(user);
    expect(registeredUser).toBeDefined();
    expect(passwordWithoutHash).not.toEqual(user.password);
  });

  it('should throw an error if the user already exists', async () => {
    const user = userFactory();
    await useCase.execute(user);
    await expect(useCase.execute(user)).rejects.toThrow(UserAlreadyExistsError);
  });
});
