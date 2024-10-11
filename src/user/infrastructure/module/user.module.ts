import { AuthGuard } from '@/src/auth/auth.guard';
import { LoggerModule } from '@/src/shared/logger.module';
import { PrismaService } from '@/src/shared/prisma-client';
import { LoginUserUseCase, RegisterUserUseCase } from '@/user/application';
import { AuthService, UserRepository } from '@/user/domain';
import {
  JWTAuthService,
  PrismaUserRepository,
  UserController,
} from '@/user/infrastructure';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
@Module({
  controllers: [UserController],
  imports: [LoggerModule],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    PrismaUserRepository,
    PrismaService,
    AuthGuard,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: AuthService, useClass: JWTAuthService },
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
  ],
})
export class UserModule {}
