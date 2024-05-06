import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import excelRoutes from './routes/excelRoutes.js';
// import { redisOptions } from './server.js';

// import Queue from 'bull';
// import {
//   ExpressAdapter,
//   createBullBoard,
//   BullAdapter,
// } from '@bull-board/express/bull';

// Create a new queue with the Redis connection options
// const queuesList = ['burger'];

// const serverAdapter = new ExpressAdapter();
// serverAdapter.setBasePath('/admin/queues');

// const queues = queuesList
//   .map((qs) => new Queue(qs, redisOptions))
//   .map((q) => new BullAdapter(q));
// const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
//   queues,
//   serverAdapter: serverAdapter,
// });

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use(compression());

// ROUTES
app.use('/api/excel', excelRoutes);
// app.use('/admin/queues', serverAdapter.getRouter());

export default app;
