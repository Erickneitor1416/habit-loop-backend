import { PrismaService } from '@/src/shared/prisma-client';
import { RegisterUserUseCase } from '@/user/application';
import { AuthService, UserRepository } from '@/user/domain';
import {
  JWTAuthService,
  PrismaUserRepository,
  UserController,
} from '@/user/infrastructure';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    RegisterUserUseCase,
    PrismaUserRepository,
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: AuthService, useClass: JWTAuthService },
  ],
})
export class UserModule {}
