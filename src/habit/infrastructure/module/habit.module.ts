import { FindHabitsUseCase, SaveHabitUseCase } from '@/habit/application';
import { HabitRepository } from '@/habit/domain';
import { HabitController, PrismaHabitRepository } from '@/habit/infrastructure';
import { LoggerModule } from '@/src/shared/logger.module';
import { PrismaService } from '@/src/shared/prisma-client';
import { Module } from '@nestjs/common';

@Module({
  controllers: [HabitController],
  imports: [LoggerModule],
  providers: [
    SaveHabitUseCase,
    FindHabitsUseCase,
    PrismaService,
    { provide: HabitRepository, useClass: PrismaHabitRepository },
  ],
})
export class HabitModule {}
