import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
const objectId = JoiObjectId(Joi);

export const shipmentSchemaValidation = Joi.object({
  shipmentType: Joi.string().required(),
  orderNumber: Joi.string().required(),
  orderType: Joi.string()
    .valid('STO', 'PO', 'RO', 'SO')
    .insensitive()
    .required(),
  primaryMode: Joi.string().required(),
  expectedDeliveryDate: Joi.date().min('now').required(),
  incoterm: Joi.string().required(),
  sourceLocation: Joi.required(),
  destinationLocation: Joi.required(),
  cargoType: Joi.string().valid('PTL', 'FTL').insensitive().required(),
  materialCode: Joi.string().required(),
  quantity: Joi.number().required(),
  quantityUnit: Joi.string().required(),
  shipmentNumber: Joi.number().required(),
  _id: Joi.required(),
});
