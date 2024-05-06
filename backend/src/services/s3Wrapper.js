import { promisify } from 'util';
import S3Client, { S3BucketName } from '../config/s3Config.js';

class AwsS3Wrapper {
  static async getObject(key, bucketName = S3BucketName) {
    const promisedGet = promisify(S3Client.getObject).bind(S3Client);
    try {
      return promisedGet({ Bucket: bucketName, Key: key });
    } catch (err) {
      console.error('Error getting object from FakeS3:', err);
      throw new Error('Failed to get object from FakeS3.');
    }
  }

  static async uploadToS3(key, body) {
    const params = {
      Bucket: S3BucketName,
      Key: key,
      Body: body,
    };

    const promisedUpload = promisify(S3Client.upload).bind(S3Client);
    try {
      const data = await promisedUpload(params);
      return data.Location;
    } catch (err) {
      console.error('Error uploading file to FakeS3:', err);
      throw new Error('Failed to upload file to FakeS3.');
    }
  }

  static async getAllItemsFromS3() {
    const params = {
      Bucket: S3BucketName,
    };

    const promisedListObjects = promisify(S3Client.listObjectsV2).bind(
      S3Client
    );
    try {
      const data = await promisedListObjects(params);
      return data.Contents.map((item) => item.Key);
    } catch (err) {
      console.error('Error fetching uploaded items from FakeS3:', err);
      throw new Error('Failed to fetch uploaded items from FakeS3.');
    }
  }

  static async deleteItemFromS3(key) {
    const params = {
      Bucket: S3BucketName,
      Key: key,
    };

    const promisedDeleteObject = promisify(S3Client.deleteObject).bind(
      S3Client
    );
    try {
      await promisedDeleteObject(params);
    } catch (err) {
      console.error('Error deleting item from FakeS3:', err);
      throw new Error('Failed to delete item from FakeS3.');
    }
  }
}

export default AwsS3Wrapper;
