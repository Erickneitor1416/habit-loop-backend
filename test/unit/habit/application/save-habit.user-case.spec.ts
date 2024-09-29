import { SaveHabitUseCase } from '@/src/habit/application';
import { HabitNotCreatedError, HabitRepository } from '@/src/habit/domain';
import { MemoryHabitRepository } from '@/src/habit/infrastructure';
import { habitFactory } from 'test/factories/habit/habit.factory';

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
    const savedHabit = await useCase.execute(habit);
    expect(savedHabit).toBeDefined();
  });

  it('should throw an error if the habit is not saved', async () => {
    const habit = habitFactory();
    habitRepository.save(habit);
    await expect(useCase.execute(habit)).rejects.toThrow(HabitNotCreatedError);
  });
});
