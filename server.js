import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/user/indexRoutes.js';
import adminRoutes from './src/routes/admin/indexRoutes.js'


const app = express();
const port = process.env.PORT || 3001;

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
app.use('/api/v1/admin', adminRoutes )

app.get("/", (req, res) => {
    res.send("Welcome to soccer pulse 💵💵💵 ");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
