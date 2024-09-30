import { SaveHabitUseCase } from '@/habit/application';
import { HabitRepository } from '@/habit/domain';
import { HabitController, MemoryHabitRepository } from '@/habit/infrastructure';
import { LoggerModule } from '@/src/shared/logger.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [HabitController],
  imports: [LoggerModule],
  providers: [
    SaveHabitUseCase,
    { provide: HabitRepository, useClass: MemoryHabitRepository },
  ],
})
export class HabitModule {}
