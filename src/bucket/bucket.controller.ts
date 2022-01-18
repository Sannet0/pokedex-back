import { Controller, Delete, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {
  }

  @Post('')
  async createNewBucket() {
    return await this.bucketService.createNewBucket();
  }

  @Delete('')
  async deleteBucket() {
    return await this.bucketService.deleteBucket();
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.bucketService.uploadFile(file.buffer);
  }
}
