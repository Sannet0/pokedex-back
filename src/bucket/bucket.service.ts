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

  async uploadFile(file, name) {
    const params = {
      Bucket: this.bucketName,
      Body: file,
      Key: name
    };

    try {
      await this.s3.upload(params).promise();
      return name + ' upload';
    } catch (err) {
      return err;
    }
  }

  async deleteFile(name) {
    const params = {
      Bucket: this.bucketName,
      Key: name
    };

    try {
      await this.s3.deleteObject(params).promise();
      return name + ' deleted';
    } catch (err) {
      return err;
    }
  }

  async downloadFile(name) {
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
}
