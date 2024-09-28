import { habitFactory } from 'test/factories/habit/habit.factory';

describe('Habit', () => {
  it('should be defined', () => {
    expect(habitFactory()).toBeDefined();
  });
});
