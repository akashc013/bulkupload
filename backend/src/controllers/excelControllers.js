import bullService, { bullQueue } from '../services/bullService.js';
import AwsS3Wrapper from '../services/s3Wrapper.js';
import ShipmentService from '../services/shipmentService.js';
import ExcelParser from '../utils/excelParser.js';
import Location from '../models/locationModel.js';
import Shipment from '../models/shipmentModel.js';

// export const uploadExcel = async (req, res, next) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded.' });
//   }

//   try {
//     const s3Data = await AwsS3Wrapper.getObject(req.file.key);
//     const excelParser = new ExcelParser(s3Data.Body);
//     const excelData = await excelParser.validateExcelData();
//     const processedData = await excelParser.processExcelData(excelData);

//     // Save to MongoDB
//     const savedShipment =
//       await ShipmentService.saveShipmentToMongoDB(processedData);

//     // Populate location names in saved shipment
//     const populatedShipment = await Shipment.populate(savedShipment, {
//       path: 'sourceLocation destinationLocation',
//       select: 'locationName',
//     });

//     res.status(200).json({ status: 'success', data: populatedShipment });
//   } catch (err) {
//     console.error('Error processing Excel file:', err);
//     res.status(500).json({ error: 'Failed to process Excel file.' });
//   }
// };

export const uploadExcel = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    
    await bullService.enqueueExcelProcessing(req.file.key);

    res
      .status(200)
      .json({ status: 'success', message: 'File queued for processing.' });
  } catch (err) {
    console.error('Error enqueueing task:', err);
    res.status(500).json({ error: 'Failed to enqueue task.' });
  }
};

export const getAllShipments = async (req, res, next) => {
  try {
    const allShipments = await Shipment.find();
    res.status(200).json({ status: 'success', data: allShipments });
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({ error: 'Failed to fetch shipments.' });
  }
};
