import express from 'express';
import {
    createPrediction, 
    addPrediction, 
    deletePredictionById, 
    deletePredictionItemById, 
    EditPredictionById,
    getAllPredictions,
    getPredictionById
} from '../../controllers/predictionController.js';
import { registerUser, loginUser, updateUser, deleteUser } from '../../controllers/userContreoller.js';
import { validatePredictions, handleValidationErrors } from '../../middlewares/validation.js';
import { adminAuth, userAuth } from '../../middlewares/auth.js';

const router = express.Router();

// Routes
router.put('/auth/update-user', updateUser);
router.delete('/auth/delete-user', deleteUser);
router.post('/create-game', adminAuth, createPrediction);
router.patch('/add-game/:id', validatePredictions, handleValidationErrors, addPrediction);
router.delete('/delete-game/:id', deletePredictionById);
router.delete('/delete-game/:id/item/:itemId', deletePredictionItemById);
router.patch('/edit-game/:id/item/:itemId', validatePredictions, handleValidationErrors, EditPredictionById);
router.get('/predictions', getAllPredictions);
router.get('/predictions/:id', getPredictionById);

export default router;
