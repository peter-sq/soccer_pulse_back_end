import express from 'express';
import adminRoutes from '../admin/adminRoutes.js'

const router = express.Router();

// Status route
router.get("/status", (_, res) => res.send("OK"));

// Admin routes
router.use('/post', adminRoutes);


export default router;
