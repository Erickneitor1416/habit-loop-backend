import { Public } from '@/src/shared/public-decorator';
import { Controller, Get, HttpCode, Inject, Logger } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}
  @ApiResponse({
    status: 200,
    description: 'Health check',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
      },
    },
  })
  @Public()
  @Get()
  @HttpCode(200)
  run() {
    this.logger.log('Health endpoint called!');
    return { status: 'ok' };
  }
}
