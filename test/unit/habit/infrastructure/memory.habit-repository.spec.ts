import { MemoryHabitRepository } from '@/src/habit/infrastructure';
import { habitFactory } from 'test/factories/habit/habit.factory';

describe('MemoryHabitRepository', () => {
  const repository = MemoryHabitRepository.getInstance();
  it('findById should return null if habit is not found', async () => {
    const result = await repository.findById('nonexistent-id', 'user-id');
    expect(result).toBeNull();
  });

  it('findById should return the habit if found', async () => {
    const habit = habitFactory({ id: 'habit-id' });
    repository.save(habit, 'user-id');
    const result = await repository.findById('habit-id', 'user-id');
    expect(result).toEqual(habit);
  });
  it('update should update the habit', async () => {
    const habit = habitFactory({ id: 'habit-id' });
    repository.save(habit, 'user-id');
    const updatedHabit = habitFactory({ id: 'habit-id', name: 'New name' });
    await repository.update(updatedHabit, 'user-id');
    const result = await repository.findById('habit-id', 'user-id');
    expect(result).toEqual(updatedHabit);
  });

  it('findById should return null if habit is not found', async () => {
    const result = await repository.findById('nonexistent-id', 'user-id');
    expect(result).toBeNull();
  });

  it('findById should return the user if found', async () => {
    const habit = habitFactory({ id: 'habit-id-3' });
    repository.save(habit, 'user-id-3');
    const result = await repository.findById('habit-id-3', 'user-id-3');
    expect(result).toEqual(habit);
  });
  it('delete should remove the habit', async () => {
    const habit = habitFactory({ id: 'habit-id-4' });
    repository.save(habit, 'user-id-4');
    await repository.delete(habit, 'user-id-4');
    const result = await repository.findById('habit-id-4', 'user-id-4');
    expect(result).toBeNull();
  });
});
