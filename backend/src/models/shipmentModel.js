import mongoose from 'mongoose';
import Location from './locationModel.js';
import { shipmentSchemaValidation } from '../helpers/validateSchema.js';

const shipmentSchema = new mongoose.Schema(
  {
    shipmentType: { type: String, required: true },
    orderNumber: { type: String, required: true },
    orderType: { type: String, required: true },
    primaryMode: { type: String, required: true },
    expectedDeliveryDate: { type: Date, required: true },
    incoterm: { type: String, required: true },
    sourceLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    destinationLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    cargoType: { type: String, required: true },
    materialCode: { type: String, required: true },
    quantity: { type: Number, required: true },
    quantityUnit: { type: String, required: true },
    shipmentNumber: { type: String },
  },
  {
    versionKey: false,
  }
);
shipmentSchema.pre('save', async function (next) {
  try {
    await shipmentSchemaValidation.validateAsync(this.toObject());
    next();
  } catch (error) {
    console.log('Error in validation: ', error);
    throw error;
  }
});

shipmentSchema.pre(/^find/, function (next) {
  this.populate('sourceLocation').populate('destinationLocation');
  next();
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

export default Shipment;
