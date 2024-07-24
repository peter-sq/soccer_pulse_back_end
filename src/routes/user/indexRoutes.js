import express from 'express';
import userRoutes from './userRoutes.js';


const router = express.Router();

// Status route
router.get("/status", (_, res) => res.send("OK"));

// User routes
router.use('/user', userRoutes);

export default router;
