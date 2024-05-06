import express from 'express';
import {
  getAllShipments,
  uploadExcel,
} from '../controllers/excelControllers.js';
import { uploadS3 } from '../middlewares/uploader.js';

const router = express.Router();

router.post('/upload', uploadS3.single('file'), uploadExcel);
router.get('/shipments', getAllShipments);

export default router;
