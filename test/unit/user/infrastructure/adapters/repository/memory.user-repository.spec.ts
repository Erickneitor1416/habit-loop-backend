import { User } from '@/user/domain';
import { MemoryUserRepository } from '@/user/infrastructure/adapters/repository/memory/memory.user-repository';

describe('MemoryUserRepository', () => {
  it('findById should return null if user is not found', async () => {
    const repository = new MemoryUserRepository();
    const result = await repository.findById('nonexistent-id');
    expect(result).toBeNull();
  });

  it('findById should return the user if found', async () => {
    const repository = new MemoryUserRepository();
    const user = new User(
      'John Doe',
      'john@example.com',
      'password',
      'user-id',
    );
    repository.save(user);
    const result = await repository.findById('user-id');
    expect(result).toEqual(user);
  });

  it('update should update the user', async () => {
    const repository = new MemoryUserRepository();
    const user = new User(
      'John Doe',
      'john@example.com',
      'password',
      'user-id',
    );
    repository.save(user);

    const updatedUser = new User(
      'Jane Doe',
      'jane@example.com',
      'password',
      'user-id',
    );
    await repository.update(updatedUser);

    const result = await repository.findById('user-id');
    expect(result).toEqual(updatedUser);
  });

  it('save should reject if user with the same email already exists', async () => {
    const repository = new MemoryUserRepository();
    const user = new User(
      'John Doe',
      'john@example.com',
      'password',
      'user-id',
    );
    repository.save(user);

    const duplicateUser = new User(
      'Jane Doe',
      'john@example.com',
      'password',
      'user-id-2',
    );
    await expect(repository.save(duplicateUser)).rejects.toThrow(Error);
  });

  it('findByEmail should return null if user is not found', async () => {
    const repository = new MemoryUserRepository();
    const result = await repository.findByEmail('nonexistent@example.com');
    expect(result).toBeNull();
  });

  it('findByEmail should return the user if found', async () => {
    const repository = new MemoryUserRepository();
    const user = new User(
      'John Doe',
      'john@example.com',
      'password',
      'user-id',
    );
    repository.save(user);
    const result = await repository.findByEmail('john@example.com');
    expect(result).toEqual(user);
  });
});
