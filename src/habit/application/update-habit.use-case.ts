import {
  Habit,
  HabitAlreadyExistsError,
  HabitNotFoundError,
  HabitRepository,
} from '@/habit/domain';
import Injectable from '@/src/IoC/dependency-injector';

@Injectable()
export class UpdateHabitUseCase {
  constructor(private readonly habitRepository: HabitRepository) {}

  async execute(habit: Habit, userId: string): Promise<Habit> {
    const habitExists = await this.habitRepository.findById(
      habit.id ?? '',
      userId,
    );
    if (!habitExists) {
      throw new HabitNotFoundError();
    }
    const updatedHabit = await this.habitRepository.update(habit, userId);
    if (!updatedHabit) {
      throw new HabitAlreadyExistsError();
    }
    return updatedHabit;
  }
}
