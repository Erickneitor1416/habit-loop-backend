import { LoggerModule } from '@/shared/logger.module';
import { HealthModule } from '@/src/health/health.module';
import { UserModule } from '@/user/infrastructure';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
