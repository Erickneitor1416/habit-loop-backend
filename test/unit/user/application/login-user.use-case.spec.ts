import { PrismaService } from '@/src/shared/prisma-client';
import {
  AuthService,
  UserRepository,
  UserUnauthorizedError,
} from '@/src/user/domain';
import { LoginUserUseCase } from '@/user/application';
import { MemoryUserRepository, UserModule } from '@/user/infrastructure';
import { Test, TestingModule } from '@nestjs/testing';
import { userFactory } from 'test/factories/user/user.factory';
import { authServiceMock } from 'test/mocks/auth-service.mock';
import { PrismaServiceMock } from 'test/mocks/prisma-service.mock';

describe(LoginUserUseCase, () => {
  let useCase: LoginUserUseCase;
  let userRepository: UserRepository;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserRepository)
      .useClass(MemoryUserRepository)
      .overrideProvider(PrismaService)
      .useClass(PrismaServiceMock)
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();
    useCase = moduleFixture.get<LoginUserUseCase>(LoginUserUseCase);
    userRepository = moduleFixture.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should login a user', async () => {
    const user = userFactory();
    await userRepository.save(user);

    const token = await useCase.execute(user.email, user.password);
    expect(token).toBeDefined();
  });

  it('should throw an error if the user does not exist', async () => {
    const user = userFactory();
    await expect(useCase.execute(user.email, user.password)).rejects.toThrow(
      UserUnauthorizedError,
    );
  });
});
