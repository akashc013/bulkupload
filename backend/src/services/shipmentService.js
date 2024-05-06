import Shipment from '../models/shipmentModel.js';

class ShipmentService {
  static async saveShipmentToMongoDB(data) {
    try {
      const savedShipment = await Shipment.create(data);
      return savedShipment;
    } catch (error) {
      console.error('Error saving shipment data to MongoDB:', error);
      throw new Error('Error saving shipment data to MongoDB.');
    }
  }

  static async saveShipmentToPostgres(data) {
    try {
      const shipment = await Shipment.create(data);
      console.log('Shipment saved successfully:', shipment.toJSON());
      return shipment;
    } catch (error) {
      console.error('Error saving shipment data to Postgres:', error);
      throw new Error('Error saving shipment data to Postgres.');
    }
  }
}

export default ShipmentService;
