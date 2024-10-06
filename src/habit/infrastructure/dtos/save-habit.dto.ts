import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Frequency } from '../../domain';

export class SaveHabitDto {
  @ApiProperty({
    example: 'Exercise',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'Exercise for 30 minutes',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: Frequency.DAILY,
    enum: Frequency,
  })
  @IsEnum(Frequency)
  @IsNotEmpty()
  frequency: Frequency;
  @ApiProperty({
    example: 5,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  goal: number;
}
