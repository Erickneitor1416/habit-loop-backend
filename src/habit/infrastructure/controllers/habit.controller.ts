import { SaveHabitUseCase } from '@/habit/application';
import { Habit } from '@/habit/domain';
import {
  BadRequestException,
  Body,
  Controller,
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
import { SaveHabitDto } from '../dtos';

@ApiTags('habit')
@ApiBearerAuth()
@Controller('habit')
export class HabitController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly saveHabitUseCase: SaveHabitUseCase,
  ) {}
  @ApiResponse({
    description: 'The habit has been successfully registered.',
    type: SaveHabitDto,
    status: 201,
  })
  @ApiOperation({ summary: 'Create a new habit' })
  @Post('create')
  async create(
    @Body() saveHabitDto: SaveHabitDto,
    @Request() req: FastifyRequest,
  ): Promise<SaveHabitDto> {
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

  private toDomain(saveHabitDto: SaveHabitDto): Habit {
    return new Habit(
      saveHabitDto.name,
      saveHabitDto.description,
      saveHabitDto.frequency,
      saveHabitDto.goal,
    );
  }
  private toDto(habit: Habit): SaveHabitDto {
    return {
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      goal: habit.goal,
    };
  }
}
