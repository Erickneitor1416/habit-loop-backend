import { Habit } from '@/habit/domain';

export abstract class HabitRepository {
  abstract save(habit: Habit): Promise<Habit | null>;
  abstract update(habit: Habit): Promise<Habit>;
  abstract delete(habit: Habit): Promise<void>;
  abstract findAll(): Promise<Habit[]>;
  abstract findById(id: string): Promise<Habit | null>;
}
