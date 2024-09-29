import { Habit, HabitNotCreatedError, HabitRepository } from '@/habit/domain';
import Injectable from '@/src/IoC/dependency-injector';

@Injectable()
export class SaveHabitUseCase {
  constructor(private readonly habitRepository: HabitRepository) {}

  async execute(habit: Habit) {
    const savedHabit = await this.habitRepository.save(habit);
    if (!savedHabit) {
      throw new HabitNotCreatedError();
    }
    return savedHabit;
  }
}
