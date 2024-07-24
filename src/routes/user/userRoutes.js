import express from 'express';
import { getAllPredictions, getPredictionById } from '../../controllers/predictionController.js';

const router = express.Router();

// Routes
router.get('/all-games', getAllPredictions);
router.get('/all-games/:id', getPredictionById);

export default router;
