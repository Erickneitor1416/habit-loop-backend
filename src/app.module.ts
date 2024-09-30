import { LoggerModule } from '@/shared/logger.module';
import { HealthModule } from '@/src/health/health.module';
import { UserModule } from '@/user/infrastructure';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HabitModule } from './habit/infrastructure/module/habit.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    UserModule,
    HabitModule,
  ],
})
export class AppModule {}
