import mongoose from 'mongoose';

const errorSchema = new mongoose.Schema({
  status: {
    type: String,
    required: [true, 'Error has a status'],
  },
  error: {
    type: Object,
    required: [true, 'Error has a error name'],
  },
  message: {
    type: String,
    required: [true, 'Error has a message'],
  },
  stack: {
    type: String,
  },
});

const ErrorStack = mongoose.model('ErrorStack', errorSchema);

export default ErrorStack;
