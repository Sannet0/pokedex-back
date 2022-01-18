import { Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class BucketService {
  s3 = new S3({
    region: process.env.AWS_S3_BUCKET_REGION,
    accessKeyId: process.env.AWS_S3_ACCESSKEYID,
    secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY
  });

  bucketName = 'auto-created-bucket';
  fileName = 'auto-upload-file';

  async createNewBucket() {
    const bucketName = 'auto-created-bucket'
    const params = {
      Bucket: bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_S3_BUCKET_REGION
      }
    };

    try {
      await this.s3.createBucket(params).promise();
      return bucketName;
    } catch (err) {
      return err;
    }
  }

  async deleteBucket() {
    const bucketName = 'auto-created-bucket'
    const params = {
      Bucket: bucketName
    };

    try {
      await this.s3.deleteBucket(params).promise();
      return bucketName + ' delete';
    } catch (err) {
      return err;
    }
  }

  async uploadFile(file) {
    const params = {
      Bucket: this.bucketName,
      Body: file,
      Key: this.fileName
    };

    try {
      await this.s3.upload(params).promise();
      return this.fileName + ' upload';
    } catch (err) {
      return err;
    }
  }
}
