import {
  Controller,
  Delete,
  Get, HttpException,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {
  }

  @Get('')
  async isAutoCreatedBucketExist(): Promise<{ isAutoCreatedBucketExist: boolean }> {
    return await this.bucketService.isAutoCreatedBucketExist();
  }

  @Post('')
  async createNewBucket(): Promise<HttpException> {
    return await this.bucketService.createNewBucket();
  }

  @Delete('')
  async deleteBucket(): Promise<HttpException> {
    return await this.bucketService.deleteBucket();
  }

  @Post('/file/:name')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param() param: { name: string }): Promise<HttpException> {
    return await this.bucketService.uploadFile(file.buffer, param.name);
  }

  @Delete('/file/:name')
  async deleteFile(@Param() param: { name: string }): Promise<HttpException> {
    return await this.bucketService.deleteFile(param.name);
  }

  @Get('/file/:name')
  async downloadFile(@Param() param: { name: string }): Promise<StreamableFile> {
    const file =  await this.bucketService.downloadFile(param.name);
    return new StreamableFile(file);
  }

  @Get('/filelist')
  async fileList(): Promise<string[]> {
    return await this.bucketService.fileList();
  }
}
