import { Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class AWSService {

  async createNewBucket() {
    const s3 = new S3({
      region: process.env.AWS_S3_BUCKET_REGION,
      accessKeyId: process.env.AWS_S3_ACCESSKEYID,
      secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY
    });

    const bucketName = 'auto-created-bucket'
    const params = {
      Bucket: bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_S3_BUCKET_REGION
      }
    };

    try {
      await s3.createBucket(params).promise();

      return bucketName;
    } catch (err) {
      return err;
    }
  }
}
