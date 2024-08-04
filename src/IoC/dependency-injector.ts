import { Injectable as NestInjectable } from '@nestjs/common';

export default function Injectable(): ClassDecorator {
  return NestInjectable();
}
