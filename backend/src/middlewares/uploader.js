import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import S3Client, { S3BucketName } from '../config/s3Config.js';
import AppError from '../utils/appError.js';

const multerStorage = multer.memoryStorage();

export const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

export const uploadS3 = multer({
  storage: multerS3({
    s3: S3Client,
    bucket: S3BucketName,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { original_name: file.originalname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: function (req, file, cb) {
    const validExtensions = /xlsx|xls|csv/;
    const extname = validExtensions.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = /sheet|excel|csv/.test(file.mimetype.toLowerCase());
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(
        new AppError('Only Excel files (xlsx, xls, csv) are allowed.', 400),
        false
      );
    }
  },
});
