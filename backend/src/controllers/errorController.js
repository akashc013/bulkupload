import ErrorStack from '../models/errorModel.js';
import AppError from '../utils/appError.js';

const saveError = async (err) => {
  const newError = await ErrorStack.create({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

  return newError.id;
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = async (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export default function globalErrorHandler(err, req, res, next) {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  sendErrorDev(err, req, res);
}
