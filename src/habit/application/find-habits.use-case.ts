import { Habit, HabitRepository } from '@/habit/domain';
import Injectable from '@/src/IoC/dependency-injector';

@Injectable()
export class FindHabitsUseCase {
  constructor(private readonly habitRepository: HabitRepository) {}

  async execute(userId: string): Promise<Habit[]> {
    const habits = await this.habitRepository.findAll(userId);
    return habits;
  }
}
