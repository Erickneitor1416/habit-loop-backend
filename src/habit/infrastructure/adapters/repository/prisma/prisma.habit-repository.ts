import { Frequency, Habit, HabitRepository } from '@/habit/domain';
import Injectable from '@/src/IoC/dependency-injector';
import { PrismaService } from '@/src/shared/prisma-client';
import { Habit as PrismaHabit } from '@prisma/client';

@Injectable()
export class PrismaHabitRepository extends HabitRepository {
  update(habit: Habit, userId: string): Promise<Habit> {
    throw new Error(`Method not implemented.${userId},${habit.name}`);
  }
  delete(habit: Habit, userId: string): Promise<void> {
    throw new Error(`Method not implemented.${habit.name},${userId}`);
  }
  findAll(userId: string): Promise<Habit[]> {
    throw new Error(`Method not implemented.${userId}`);
  }
  findById(id: string, userId: string): Promise<Habit | null> {
    throw new Error(`Method not implemented.${id},${userId}`);
  }
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async save(habit: Habit, userId: string): Promise<Habit | null> {
    const prismaHabit = await this.prisma.habit.create({
      data: {
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
        goals: habit.goal,
        userId,
      },
    });
    return this.toDomain(prismaHabit);
  }
  private toDomain(prismaHabit: PrismaHabit): Habit {
    return new Habit(
      prismaHabit.name,
      prismaHabit.description,
      prismaHabit.frequency as Frequency,
      prismaHabit.goals,
      prismaHabit.id,
    );
  }
}
