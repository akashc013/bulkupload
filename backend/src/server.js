import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config({ path: 'src/config/config.env' });

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
