import { FindHabitsUseCase, SaveHabitUseCase } from '@/habit/application';
import { Habit } from '@/habit/domain';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { HabitDto } from '../dtos';

@ApiTags('habit')
@ApiBearerAuth()
@Controller('habit')
export class HabitController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly saveHabitUseCase: SaveHabitUseCase,
    private readonly findHabitsUseCase: FindHabitsUseCase,
  ) {}
  @ApiResponse({
    description: 'The habit has been successfully registered.',
    type: HabitDto,
    status: 201,
  })
  @ApiOperation({ summary: 'Create a new habit' })
  @Post('create')
  async create(
    @Body() saveHabitDto: HabitDto,
    @Request() req: FastifyRequest,
  ): Promise<HabitDto> {
    try {
      const savedHabit = await this.saveHabitUseCase.execute(
        this.toDomain(saveHabitDto),
        req.user!.sub,
      );
      return this.toDto(savedHabit);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
  @ApiResponse({
    description: 'The habits have been successfully retrieved.',
    type: [HabitDto],
    status: 200,
  })
  @ApiOperation({ summary: 'Find all habits by user id' })
  @Get('/')
  async findAll(@Request() req: FastifyRequest): Promise<HabitDto[]> {
    try {
      const habits = await this.findHabitsUseCase.execute(req.user!.sub);
      return habits.map(this.toDto);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  private toDomain(saveHabitDto: HabitDto): Habit {
    return new Habit(
      saveHabitDto.name,
      saveHabitDto.description,
      saveHabitDto.frequency,
      saveHabitDto.goal,
    );
  }
  private toDto(habit: Habit): HabitDto {
    return {
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      goal: habit.goal,
      id: habit.id,
    };
  }
}
