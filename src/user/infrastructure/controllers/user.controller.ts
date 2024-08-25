import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserUseCase } from 'src/user/application';
import { User } from 'src/user/domain';
import { RegisterUserDto } from '../dtos';
@ApiTags('user')
@Controller('user')
export default class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}
  @ApiResponse({
    description: 'User registered successfully',
    type: RegisterUserDto,
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await this.registerUserUseCase.execute(
        this.toDomain(registerUserDto),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private toDomain(registerUserDto: RegisterUserDto): User {
    return new User(
      registerUserDto.name,
      registerUserDto.email,
      registerUserDto.password,
    );
  }
}
