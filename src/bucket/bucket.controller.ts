import { Controller, Delete, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
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

  @Post('/file/:name')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param() param: { name: string }) {
    return await this.bucketService.uploadFile(file.buffer, param.name);
  }

  @Delete('/file/:name')
  async deleteFile(@Param() param: { name: string }) {
    return await this.bucketService.deleteFile(param.name);
  }

  @Get('/file/:name')
  async downloadFile(@Res() res: any, @Param() param: { name: string }) {
    const file =  await this.bucketService.downloadFile(param.name);
    return file.pipe(res);
  }
}
