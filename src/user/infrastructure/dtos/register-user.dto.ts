import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BaseUserDto {
  @ApiProperty({ example: 'User' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
export class RegisterUserDto extends BaseUserDto {
  @ApiProperty({ example: 'password' })
  @IsString()
  readonly password: string;
}

export class RegisterUserResponseDto extends BaseUserDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  readonly token: string;
}
