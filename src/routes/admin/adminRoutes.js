import express from 'express';
import { createPrediction, addPrediction, deletePredictionById,
         deletePredictionItemById,EditPredictionById,} 
from '../../controllers/predictionController.js';
import { validatePredictions, handleValidationErrors } from '../../middlewares/validation.js';

const router = express.Router();

// Routes
router.post('/create-game', createPrediction)
router.patch('/add-game/:id', validatePredictions, handleValidationErrors, addPrediction);
router.delete('/delete-game/:id', deletePredictionById)
router.delete('/delete-game/:id/item/:itemId', deletePredictionItemById )
router.patch('/edit-game/:id/item/:itemId', EditPredictionById )

export default router;
