import {
  FindHabitsUseCase,
  SaveHabitUseCase,
  UpdateHabitUseCase,
} from '@/src/habit/application';
import { HabitRepository } from '@/src/habit/domain';
import {
  HabitController,
  MemoryHabitRepository,
} from '@/src/habit/infrastructure';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyRequest } from 'fastify';
import { habitFactory } from 'test/factories/habit/habit.factory';
import { loggerServiceMock } from 'test/mocks/logger-service.mock';

describe('HabitController', () => {
  let controller: HabitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitController],
      providers: [
        SaveHabitUseCase,
        FindHabitsUseCase,
        UpdateHabitUseCase,
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
    const request = { user: { sub: '123' } } as FastifyRequest;
    const savedHabit = await controller.create(habit, request);
    expect(savedHabit).toEqual({
      description: savedHabit.description,
      frequency: savedHabit.frequency,
      goal: savedHabit.goal,
      name: savedHabit.name,
      id: savedHabit.id,
    });
  });

  it('should throw an error when the habit is not saved', async () => {
    const habit = habitFactory({ name: 'Example' });
    const request = { user: { sub: '1234' } } as FastifyRequest;
    await controller.create(habit, request);
    await expect(controller.create(habit, request)).rejects.toThrow();
  });

  it("should return the user's habits", async () => {
    const habit = habitFactory();
    const request = { user: { sub: '123' } } as FastifyRequest;
    await controller.create(habit, request);
    const habits = await controller.findAll(request);
    expect(habits).toEqual([
      {
        description: habit.description,
        frequency: habit.frequency,
        goal: habit.goal,
        name: habit.name,
        id: habit.id,
      },
    ]);
  });
  it('should return an empty list if there are no habits', async () => {
    const request = { user: { sub: '123' } } as FastifyRequest;
    const habits = await controller.findAll(request);
    expect(habits).toEqual([]);
  });
});
