import { Module } from '@nestjs/common';
import { EmptyController } from './empty.controller';

@Module({
  controllers: [EmptyController]
})
export class EmptyModule {}
