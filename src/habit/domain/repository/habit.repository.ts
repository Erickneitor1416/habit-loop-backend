import { Habit } from '@/habit/domain';

export abstract class HabitRepository {
  abstract save(habit: Habit, userId: string): Promise<Habit | null>;
  abstract update(habit: Habit, userId: string): Promise<Habit>;
  abstract delete(habit: Habit, userId: string): Promise<void>;
  abstract findAll(userId: string): Promise<Habit[]>;
  abstract findById(id: string, userId: string): Promise<Habit | null>;
}
