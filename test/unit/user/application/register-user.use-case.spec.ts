import { PrismaService } from '@/src/shared/prisma-client';
import {
  AuthService,
  UserAlreadyExistsError,
  UserRepository,
} from '@/src/user/domain';
import { RegisterUserUseCase } from '@/user/application';
import { MemoryUserRepository, UserModule } from '@/user/infrastructure';
import { Test, TestingModule } from '@nestjs/testing';
import { userFactory } from 'test/factories/user/user.factory';
import { PrismaServiceMock } from 'test/mocks/prisma-service.mock';

describe(RegisterUserUseCase, () => {
  let useCase: RegisterUserUseCase;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
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
