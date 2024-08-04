import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/user/indexRoutes.js';
import adminRoutes from './src/routes/admin/indexRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './src/config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Connect to the database
connectDB();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());

// Allow requests from http://localhost:3000 with credentials
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/api/v1', routes);
app.use('/api/v1/admin', adminRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to soccer pulse 💵💵💵 ");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
