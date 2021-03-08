import { Bucket } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new Bucket(this, 'denolkHiveCdk', {
      bucketName: 'denolk-hive-cdk'
    });
  }
}
