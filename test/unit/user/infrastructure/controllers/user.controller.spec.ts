import { RegisterUserUseCase } from '@/user/application';
import { AuthService, UserRepository } from '@/user/domain';
import { MemoryUserRepository, UserController } from '@/user/infrastructure';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        RegisterUserUseCase,
        { provide: UserRepository, useClass: MemoryUserRepository },
        {
          provide: AuthService,
          useValue: { register: jest.fn(), hashPassword: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should register a user', async () => {
    const user = await controller.register({
      email: 'user@example.com',
      name: 'User',
      password: 'password',
    });
    expect(user).toBeDefined();
  });
  it('should raise an error when registering a user with an existing email', async () => {
    await controller.register({
      email: 'user@example.com',
      name: 'User',
      password: 'password',
    });
    await expect(
      controller.register({
        email: 'user@example.com',
        name: 'User',
        password: 'password',
      }),
    ).rejects.toThrow();
  });
});
