import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import globalErrorHandler from './controllers/errorController.js';
import excelRoutes from './routes/excelRoutes.js';
import AppError from './utils/appError.js';

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(helmet());

// ROUTES
app.use('/api/excel', excelRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
