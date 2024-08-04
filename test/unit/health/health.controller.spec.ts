import { HealthController } from '@/src/health/api/health.controller';
import { Logger } from '@nestjs/common';

describe('HealthController', () => {
  let healthController: HealthController;
  let logger: Logger;

  beforeEach(() => {
    logger = { log: jest.fn() } as unknown as Logger;
    healthController = new HealthController(logger);
  });

  describe('run', () => {
    it('should return is healthy', () => {
      expect(healthController.run()).toEqual({ status: 'ok' });
      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });
});
