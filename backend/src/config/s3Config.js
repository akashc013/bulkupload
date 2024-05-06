import AWS from 'aws-sdk';

export const S3BucketName = 'fake-bucket';

const S3Client = new AWS.S3({
  endpoint: 'http://localhost:4569',
  accessKeyId: 'fake-access-key',
  secretAccessKey: 'fake-secret-access-key',
});

export default S3Client;
