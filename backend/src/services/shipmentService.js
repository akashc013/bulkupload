import Shipment from '../models/shipmentModel.js';
import AppError from '../utils/appError.js';

class ShipmentService {
  static async saveShipmentToMongoDB(data) {
    try {
      const savedShipment = await Shipment.insertMany(data);
      return savedShipment;
    } catch (error) {
      console.error('Error saving shipment data to MongoDB:', error);
      return next(new AppError('Error saving shipment data to MongoDB.', 500));
    }
  }
}

export default ShipmentService;
