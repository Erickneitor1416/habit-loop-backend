import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class RegisterUserDto {
  @ApiProperty({ example: 'User' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password should be at least 8 characters' })
  readonly password: string;
}

export class RegisterUserResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  readonly token: string;
  @ApiProperty()
  user: UserDto;
}
