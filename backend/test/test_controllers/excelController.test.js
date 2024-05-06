import { expect } from 'chai';
import path, { dirname } from 'path';
import sinon from 'sinon';
import request from 'supertest';
import { fileURLToPath } from 'url';
import app from '../../src/app.js';
import Shipment from '../../src/models/shipmentModel.js';
import bullService from '../../src/services/bullService.js';

// Set environment variable to use test configuration
process.env.NODE_ENV = 'test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Excel Controller Unit Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST uploadExcel', () => {
    it('should return 400 if no file is uploaded', async () => {
      const res = await request(app).post('/api/excel/upload');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('No file uploaded.');
    });

    it('should return 200 if file is uploaded successfully', async () => {
      sinon.stub(bullService, 'enqueueExcelProcessing').resolves();
      const filePath = path.resolve(
        __dirname,
        '../../plan_bulk_upload_same_order_same_shipment.xlsx'
      );
      const res = await request(app)
        .post('/api/excel/upload')
        .attach('file', filePath);

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.message).to.equal('File queued for processing.');
    });
  });

  describe('GET getAllShipments', () => {
    it('should return 404 if no shipments are found', async () => {
      sinon.stub(Shipment, 'find').resolves([]);
      const res = await request(app).get('/api/excel/shipments');
      expect(res.status).to.equal(404);
      expect(res.body.error).to.equal('No shipments found.');
    });

    it('should return 500 if an error occurs while fetching shipments', async () => {
      sinon.stub(Shipment, 'find').rejects(new Error('Test error'));
      const res = await request(app).get('/api/excel/shipments');
      expect(res.status).to.equal(500);
      expect(res.body.error).to.equal('Failed to fetch shipments.');
    });

    it('should return 200 if shipments are found', async () => {
      const mockShipments = [{ _id: '1', shipmentType: 'Type A' }];
      sinon.stub(Shipment, 'find').resolves(mockShipments);
      const res = await request(app).get('/api/excel/shipments');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.deep.equal(mockShipments);
    });
  });
});
