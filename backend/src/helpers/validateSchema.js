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
  sourceLocation: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID')
    .required(),
  destinationLocation: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID')
    .required(),
  cargoType: Joi.string().valid('PTL', 'FTL').insensitive().required(),
  materialCode: Joi.string().required(),
  quantity: Joi.number().required(),
  quantityUnit: Joi.string().required(),
  shipmentNumber: Joi.number().required(),
});
