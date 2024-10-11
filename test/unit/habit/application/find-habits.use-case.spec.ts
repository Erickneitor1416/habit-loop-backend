import { FindHabitsUseCase } from '@/src/habit/application';
import { HabitRepository } from '@/src/habit/domain';
import { MemoryHabitRepository } from '@/src/habit/infrastructure';
import { habitFactory } from 'test/factories/habit/habit.factory';
import { userFactory } from 'test/factories/user/user.factory';

describe(FindHabitsUseCase, () => {
  let useCase: FindHabitsUseCase;
  let habitRepository: HabitRepository;
  beforeAll(async () => {
    habitRepository = MemoryHabitRepository.getInstance();
    useCase = new FindHabitsUseCase(habitRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the saved habit', async () => {
    const habit = habitFactory();
    const user = userFactory();
    habitRepository.save(habit, user.id ?? '');
    const savedHabit = await useCase.execute(user.id ?? '');
    expect(savedHabit).toBeDefined();
    expect(savedHabit[0]).toEqual(habit);
  });

  it('should return a empty list if there are not habit', async () => {
    const user = userFactory();
    const habits = await useCase.execute(user.id ?? '');
    expect(habits).toEqual([]);
  });
});
