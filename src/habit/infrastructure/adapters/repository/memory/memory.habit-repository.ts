import { Habit, HabitRepository } from '@/src/habit/domain';
import Injectable from '@/src/IoC/dependency-injector';
@Injectable()
export class MemoryHabitRepository extends HabitRepository {
  private readonly habits: Record<string, Habit[]> = {};
  public static instance: MemoryHabitRepository;
  async findById(id: string, userId: string): Promise<Habit | null> {
    const habit = this.habits[userId]?.find(h => h.id === id);
    if (!habit) return Promise.resolve(null);
    return Promise.resolve(habit);
  }
  async findAll(userId: string): Promise<Habit[]> {
    return Promise.resolve(this.habits[userId]);
  }
  async save(habit: Habit, userId: string): Promise<Habit | null> {
    if (this.habits[userId]?.find(h => h.name === habit.name))
      return Promise.resolve(null);
    if (this.habits[userId]) {
      this.habits[userId].push(habit);
    } else {
      this.habits[userId] = [habit];
    }
    return Promise.resolve(habit);
  }
  async update(habit: Habit, userId: string): Promise<Habit> {
    const index = this.habits[userId]?.findIndex(h => h.id === habit.id);
    this.habits[userId][index] = habit;
    return Promise.resolve(habit);
  }
  async delete(habit: Habit, userId: string): Promise<void> {
    const index = this.habits[userId]?.findIndex(h => h.id === habit.id);
    this.habits[userId].splice(index, 1);
    return Promise.resolve();
  }

  public static getInstance(): MemoryHabitRepository {
    if (!MemoryHabitRepository.instance) {
      MemoryHabitRepository.instance = new MemoryHabitRepository();
    }
    return MemoryHabitRepository.instance;
  }
}
