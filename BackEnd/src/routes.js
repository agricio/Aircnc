const express = require('express');
const multer = require('multer');

const UploadConfig = require('./config/upload');
const SessionController = require('./controller/SessionController');
const SpotController = require('./controller/SpotController');
const DashboardController = require('./controller/DashboardController');
const BookingController = require('./controller/BookingController');

const routes = express.Router();
const upload = multer(UploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/spot', upload.single('thumbnail'), SpotController.store);
routes.get('/spot', SpotController.index);
routes.get('/dashboard', DashboardController.show);

routes.post('/spot/:spot_id/booking', BookingController.store);


module.exports = routes ;