import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config({ path: 'src/config/config.env' });

// UNCAUGHT EXCEPTION
process.on('uncaughtException', (error) => {
  console.error('An uncaught exception was detected! Initiating shutdown...');
  console.error(error);
  process.exit(1);
});

// CONNECT TO MONGODB DATABASE
const DB = process.env.MONGODB_URL.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// START SERVER
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// UNHANDLED REJECTION
process.on('unhandledRejection', (error) => {
  console.error(
    'An unhandled promise rejection was detected! Initiating shutdown...'
  );
  console.error(error);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
