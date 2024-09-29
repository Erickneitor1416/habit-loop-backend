import { MemoryHabitRepository } from '@/src/habit/infrastructure';
import { habitFactory } from 'test/factories/habit/habit.factory';

describe('MemoryHabitRepository', () => {
  const repository = MemoryHabitRepository.getInstance();
  it('findById should return null if habit is not found', async () => {
    const result = await repository.findById('nonexistent-id');
    expect(result).toBeNull();
  });

  it('findById should return the habit if found', async () => {
    const habit = habitFactory({ id: 'user-id' });
    repository.save(habit);
    const result = await repository.findById('user-id');
    expect(result).toEqual(habit);
  });

  it('update should update the habit', async () => {
    const habit = habitFactory({ id: 'user-id' });
    repository.save(habit);
    const updatedHabit = habitFactory({ id: 'user-id', name: 'New name' });
    await repository.update(updatedHabit);
    const result = await repository.findById('user-id');
    expect(result).toEqual(updatedHabit);
  });

  it('findById should return null if habit is not found', async () => {
    const result = await repository.findById('nonexistent-id');
    expect(result).toBeNull();
  });

  it('findById should return the user if found', async () => {
    const habit = habitFactory({ id: 'user-id-3' });
    repository.save(habit);
    const result = await repository.findById('user-id-3');
    expect(result).toEqual(habit);
  });
  it('delete should remove the habit', async () => {
    const habit = habitFactory({ id: 'user-id-4' });
    repository.save(habit);
    await repository.delete(habit);
    const result = await repository.findById('user-id-4');
    expect(result).toBeNull();
  });
});
