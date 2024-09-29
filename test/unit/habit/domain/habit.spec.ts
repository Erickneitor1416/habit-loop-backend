import { habitFactory } from 'test/factories/habit/habit.factory';

describe('Habit', () => {
  it('should be defined', () => {
    expect(habitFactory()).toBeDefined();
  });
  it('should get the values of the habit', () => {
    const habit = habitFactory();
    expect(habit.id).toBeDefined();
    expect(habit.name).toBeDefined();
    expect(habit.description).toBeDefined();
    expect(habit.frequency).toBeDefined();
    expect(habit.goal).toBeDefined();
  });
  it('should set the values of the habit', () => {
    const habit = habitFactory();
    habit.id = '1';
    habit.name = 'Habit';
    habit.description = 'Description';
    habit.frequency = 1;
    habit.goal = 1;
    expect(habit.id).toBe('1');
    expect(habit.name).toBe('Habit');
    expect(habit.description).toBe('Description');
    expect(habit.frequency).toBe(1);
    expect(habit.goal).toBe(1);
  });
});
