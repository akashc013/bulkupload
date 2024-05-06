import Bull from 'bull';
import dotenv from 'dotenv';
import Shipment from '../models/shipmentModel.js';
import ShipmentService from '../services/shipmentService.js';
import ExcelParser from '../utils/excelParser.js';
import AwsS3Wrapper from './s3Wrapper.js';
import { shipmentSchemaValidation } from '../helpers/validateSchema.js';
import AppError from '../utils/appError.js';

dotenv.config({ path: 'src/config/config.env' });

const redisOptions = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

export const bullQueue = new Bull('excelProcessingQueue', redisOptions);

bullQueue.process(async (job) => {
  const { key } = job.data;

  console.log(`Processing Excel file with key: ${key}`);
  const errors = [];

  try {
    const s3Data = await AwsS3Wrapper.getObject(key);
    const excelParser = new ExcelParser(s3Data.Body);
    const excelData = excelParser.toJson();
    const processedData = await excelParser.processExcelData(excelData);

    // Joi validation
    processedData.forEach((data) => {
      const val = shipmentSchemaValidation.validate(data);
      if (val.error) errors.push(val.error.message);
    });

    if (errors.length > 0) {
      console.log('Errors in validation: ', errors);
      const errorMessage = errors.join(', ');
      return new AppError(errorMessage, 400);
      // throw errors;
    } else console.log('no errors while validation');

    // Save processed data to database
    await ShipmentService.saveShipmentToMongoDB(processedData);

    console.log(`Excel file processing completed for key: ${key}`);
  } catch (error) {
    console.error(`Error processing Excel file with key ${key}:`, error);
    return new AppError('Error while processing excel file', 500);
  }
});

// Event handling
bullQueue.on('completed', (job) => {
  console.log(`Processing completed for job ${job.id}`);
});

bullQueue.on('failed', (job, error) => {
  console.error(`Processing failed for job ${job.id}:`, error);
});

export default {
  enqueueExcelProcessing: async (key) => {
    await bullQueue.add({ key });
  },
};
