import { SaveHabitUseCase } from '@/src/habit/application';
import { HabitRepository } from '@/src/habit/domain';
import {
  HabitController,
  MemoryHabitRepository,
} from '@/src/habit/infrastructure';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { habitFactory } from 'test/factories/habit/habit.factory';
import { loggerServiceMock } from 'test/mocks/logger-service.mock';

describe('HabitController', () => {
  let controller: HabitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitController],
      providers: [
        SaveHabitUseCase,
        {
          provide: Logger,
          useValue: loggerServiceMock,
        },
        {
          provide: HabitRepository,
          useClass: MemoryHabitRepository,
        },
      ],
    }).compile();

    controller = module.get<HabitController>(HabitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return a saved habit', async () => {
    const habit = habitFactory();
    const savedHabit = await controller.create(habit);
    expect(savedHabit).toEqual({
      description: savedHabit.description,
      frequency: savedHabit.frequency,
      goal: savedHabit.goal,
      name: savedHabit.name,
    });
  });
  it('should throw an error when the habit is not saved', async () => {
    const habit = habitFactory({ name: 'Example' });
    await controller.create(habit);
    await expect(controller.create(habit)).rejects.toThrow();
  });
});
