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
const port = process.env.PORT || 10000;

// Connect to the database
connectDB();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());

// Allow requests from specific origins with credentials
const allowedOrigins = ['http://localhost:3000', 'https://www.soccerpulse.com.ng', 
    'https://soccer-pulse-back-end.onrender.com', 'https://soccerpulse.com.ng'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true 
}));

app.options('*', cors()); // Handle preflight requests

// Routes
app.use('/api/v1', routes);
app.use('/api/v1/admin', adminRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to soccer pulse 💵💵💵 ");
});

// Error handling for CORS
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        res.status(403).json({ message: err.message });
    } else {
        next(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
