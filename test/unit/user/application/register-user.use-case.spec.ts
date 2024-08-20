import { UserAlreadyExistsError, UserRepository } from '@/src/user/domain';
import { RegisterUserUseCase } from '@/user/application';
import { MemoryUserRepository } from '@/user/infrastructure';
import { userFactory } from 'test/factories/user/user.factory';

describe(RegisterUserUseCase, () => {
  const repository: UserRepository = new MemoryUserRepository();

  it('should be defined', () => {
    expect(new RegisterUserUseCase(repository)).toBeDefined();
  });

  it('should register a user', async () => {
    const useCase = new RegisterUserUseCase(repository);
    const user = userFactory();
    const passwordWithoutHash = user.password;
    const registeredUser = await useCase.execute(user);
    expect(registeredUser).toBeDefined();
    expect(passwordWithoutHash).not.toEqual(user.password);
  });

  it('should throw an error if the user already exists', async () => {
    const useCase = new RegisterUserUseCase(repository);
    const user = userFactory();
    await useCase.execute(user);
    await expect(useCase.execute(user)).rejects.toThrow(UserAlreadyExistsError);
  });
});
