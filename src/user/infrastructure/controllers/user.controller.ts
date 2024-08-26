import { Public } from '@/src/shared/public-decorator';
import { RegisterUserUseCase } from '@/user/application';
import { User } from '@/user/domain';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto, RegisterUserResponseDto } from '../dtos';
@ApiTags('user')
@Controller('user')
export default class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @ApiResponse({
    description: 'User registered successfully',
    type: RegisterUserResponseDto,
    status: 201,
  })
  @ApiOperation({ summary: 'Register a new user' })
  @Public()
  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    try {
      const { user, token } = await this.registerUserUseCase.execute(
        this.toDomain(registerUserDto),
      );
      return {
        name: user.name,
        email: user.email,
        token: token,
      };
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
