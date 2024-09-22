import { Public } from '@/src/shared/public-decorator';
import { LoginUserUseCase, RegisterUserUseCase } from '@/user/application';
import { User } from '@/user/domain';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, LoginUserResponseDto, RegisterUserDto } from '../dtos';
@ApiTags('user')
@Controller('user')
export default class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @ApiResponse({
    description: 'User registered successfully',
    type: LoginUserResponseDto,
    status: 201,
  })
  @ApiOperation({ summary: 'Register a new user' })
  @Public()
  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<LoginUserResponseDto> {
    try {
      const { accessToken, user } = await this.registerUserUseCase.execute(
        this.toDomain(registerUserDto),
      );
      return {
        user: { name: user.name, email: user.email },
        accessToken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @ApiOperation({
    summary: 'Login with email and password',
  })
  @ApiResponse({
    description: 'User logged in successfully',
    type: LoginUserResponseDto,
    status: 200,
  })
  @Public()
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    try {
      const { accessToken, user } = await this.loginUserUseCase.execute(
        loginUserDto.email,
        loginUserDto.password,
      );
      return {
        accessToken,
        user: {
          name: user.name,
          email: user.email,
        },
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
