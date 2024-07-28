import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/user/indexRoutes.js';
import adminRoutes from './src/routes/admin/indexRoutes.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { adminAuth, userAuth } from './src/middlewares/auth.js';




const app = express();
app.use(cookieParser());
const port = process.env.PORT || 3001;

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/soccer-prediction', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/api/v1', routes);
app.use('/api/v1/admin', adminAuth, adminRoutes )

app.get("/", (req, res) => {
    res.send("Welcome to soccer pulse 💵💵💵 ");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
