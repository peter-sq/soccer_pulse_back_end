import express from 'express';
import { getAllPredictions, getPredictionById } from '../../controllers/predictionController.js';
import { registerUser, loginUser, updateUser, deleteUser } from '../../controllers/userContreoller.js';
// import { adminAuth, userAuth } from './src/middlewares/auth.js';

const router = express.Router();

// Routes
router.post('/auth/login',  loginUser);
router.post('/auth/register', registerUser);
router.get('/all-games', getAllPredictions);
router.get('/all-games/:id', getPredictionById);

export default router;
