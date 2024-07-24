import mongoose from 'mongoose';

const predictionItemSchema = new mongoose.Schema({
    time: { type: String, required: true },
    prediction: { type: String, required: true },
    odds: { type: Number, required: true },
    result: { type: String, required: true },
    fixtures: { type: String, required: true}
});

const predictionSchema = new mongoose.Schema({
    game_id: { type: String, required: true },
    date: { type: Date, default: Date.now },
    predictions: [predictionItemSchema],
});

const Prediction = mongoose.model('Prediction', predictionSchema);

export default Prediction;
