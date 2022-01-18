import { Module } from '@nestjs/common';
import { AWSController } from './aws.controller';
import { AWSService } from './aws.service';

@Module({
  providers: [AWSService],
  controllers: [AWSController]
})
export class AWSModule {}
