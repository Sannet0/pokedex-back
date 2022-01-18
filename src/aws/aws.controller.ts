import { Controller, Post } from '@nestjs/common';
import { AWSService } from './aws.service';

@Controller('aws')
export class AWSController {
  constructor(private readonly awsService: AWSService) {
  }

  @Post()
  async createNewBucket() {
    return await this.awsService.createNewBucket();
  }
}
