import { SaveHabitUseCase } from '@/src/habit/application';
import { HabitNotCreatedError, HabitRepository } from '@/src/habit/domain';
import { MemoryHabitRepository } from '@/src/habit/infrastructure';
import { habitFactory } from 'test/factories/habit/habit.factory';
import { userFactory } from 'test/factories/user/user.factory';

describe(SaveHabitUseCase, () => {
  let useCase: SaveHabitUseCase;
  let habitRepository: HabitRepository;
  beforeAll(async () => {
    habitRepository = MemoryHabitRepository.getInstance();
    useCase = new SaveHabitUseCase(habitRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the saved habit', async () => {
    const habit = habitFactory();
    const user = userFactory();
    const savedHabit = await useCase.execute(habit, user.id ?? '');
    expect(savedHabit).toBeDefined();
  });

  it('should throw an error if the habit is not saved', async () => {
    const habit = habitFactory();
    const user = userFactory();
    habitRepository.save(habit, user.id ?? '');
    await expect(useCase.execute(habit, user.id ?? '')).rejects.toThrow(
      HabitNotCreatedError,
    );
  });
});
