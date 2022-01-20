import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';
import { Readable } from 'stream';

@Injectable()
export class BucketService {
  private readonly s3 = new S3({
    region: process.env.AWS_S3_BUCKET_REGION,
    accessKeyId: process.env.AWS_S3_ACCESSKEYID,
    secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY
  });

  private readonly bucketName = 'auto-created-bucket';

  async createNewBucket(): Promise<HttpException> {
    const params = {
      Bucket: this.bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_S3_BUCKET_REGION
      }
    };

    try {
      await this.s3.createBucket(params).promise();
      return new HttpException(this.bucketName + ' created', HttpStatus.OK);
    } catch (err) {
      return err;
    }
  }

  async deleteBucket() {
    const params = {
      Bucket: this.bucketName
    };

    try {
      const fileList: string[] = await this.fileList();
      for(let i = 0; i <= fileList.length; i++) {
        await this.deleteFile(fileList[i]);
      }

      await this.s3.deleteBucket(params).promise();
      return new HttpException(this.bucketName + ' delete', HttpStatus.OK);
    } catch (err) {
      return err;
    }
  }

  async isAutoCreatedBucketExist(): Promise<{ isAutoCreatedBucketExist: boolean }> {
    const params = {
      Bucket: this.bucketName
    };

    try {
      await this.s3.headBucket(params).promise();
      return { isAutoCreatedBucketExist: true };
    } catch {
      return { isAutoCreatedBucketExist: false };
    }
  }

  async uploadFile(file, name): Promise<HttpException> {
    const params = {
      Bucket: this.bucketName,
      Body: file,
      Key: name
    };

    try {
      await this.s3.upload(params).promise();
      return new HttpException(name + ' upload', HttpStatus.OK);
    } catch (err) {
      return err;
    }
  }

  async deleteFile(name): Promise<HttpException> {
    const params = {
      Bucket: this.bucketName,
      Key: name
    };

    try {
      await this.s3.deleteObject(params).promise();
      return new HttpException(name + ' deleted', HttpStatus.OK);
    } catch (err) {
      return err;
    }
  }

  async downloadFile(name): Promise<Readable> {
    const params = {
      Bucket: this.bucketName,
      Key: name
    };

    try {
      return await this.s3.getObject(params).createReadStream();
    } catch (err) {
      return err;
    }
  }

  async fileList(): Promise<string[]> {
    const result: string[] = [];

    const params = {
      Bucket: this.bucketName
    };

    try {
      const fileList = await this.s3.listObjects(params).promise();
      fileList.Contents.forEach((value) => {
        result.push(value.Key)
      });

      return result;
    } catch (err) {
      return err;
    }
  }
}
