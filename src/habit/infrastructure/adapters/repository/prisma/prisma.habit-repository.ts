import { Frequency, Habit, HabitRepository } from '@/habit/domain';
import Injectable from '@/src/IoC/dependency-injector';
import { PrismaService } from '@/src/shared/prisma-client';
import { Habit as PrismaHabit } from '@prisma/client';

@Injectable()
export class PrismaHabitRepository extends HabitRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async update(habit: Habit, userId: string): Promise<Habit | null> {
    const habitWithSameName = await this.prisma.habit.findFirst({
      where: { name: habit.name, userId },
    });
    if (habitWithSameName && habitWithSameName.id !== habit.id) return null;
    const updatedHabit = await this.prisma.habit.update({
      where: { id: habit.id },
      data: {
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
        goals: habit.goal,
      },
    });
    return this.toDomain(updatedHabit);
  }
  delete(habit: Habit, userId: string): Promise<void> {
    throw new Error(`Method not implemented.${habit.name},${userId}`);
  }
  async findAll(userId: string): Promise<Habit[]> {
    const habits = await this.prisma.habit.findMany({
      where: { userId },
    });
    return habits.map(prismaHabit => this.toDomain(prismaHabit));
  }
  async findById(id: string, userId: string): Promise<Habit | null> {
    const habit = await this.prisma.habit.findFirst({
      where: { id, userId },
    });
    return habit ? this.toDomain(habit) : null;
  }
  async save(habit: Habit, userId: string): Promise<Habit | null> {
    const existingHabit = await this.prisma.habit.findFirst({
      where: { name: habit.name, userId },
    });
    console.log('existingHabit:', existingHabit, 'habit:', habit);
    if (existingHabit) return null;
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
