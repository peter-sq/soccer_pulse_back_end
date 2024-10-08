import mongoose from 'mongoose';
import Prediction from '../models/Prediction.js';
import crypto from 'crypto';

// Get all predictions
export const getAllPredictions = async (req, res) => {
    try {
        const predictions = await Prediction.find();
        res.json(predictions);
    } catch (error) {
        console.error('Error fetching predictions:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get Prediction by Id
export const getPredictionById = async (req, res) => {
    try {
        const predictionId = req.params.id;
        const prediction = await Prediction.findOne({ _id: predictionId });

        if (!prediction) {
            return res.status(404).json({ message: 'Cannot find prediction' });
        }

        res.json(prediction);
    } catch (error) {
        console.error('Error fetching prediction:', error);
        return res.status(500).json({ message: error.message });
    }
};

// Generate Unique Game Id
const generateId = () => {
    return crypto.randomBytes(3).toString('hex');
};

// Create a new prediction
export const createPrediction = async (req, res) => {
    const UniqueID = `SP-${generateId()}`;
    const newPrediction = new Prediction({
        game_id: UniqueID,
        date: req.body.date,
        predictions: req.body.predictions
    });

    try {
        await newPrediction.save();
        res.status(201).json({
            message: 'Prediction created successfully!',
            prediction: newPrediction
        });
    } catch (error) {
        console.error('Error creating prediction:', error);
        res.status(400).json({ message: error.message });
    }
};

// Add a new prediction item to an existing prediction
export const addPrediction = async (req, res) => {
    const { id } = req.params;
    const newPredictionItem = {
        league: req.body.league,
        prediction: req.body.prediction,
        odds: req.body.odds,
        result: req.body.result,
        fixtures: req.body.fixtures
    };

    try {
        const updatedPrediction = await Prediction.findByIdAndUpdate(
            id,
            { $push: { predictions: newPredictionItem } },
            { new: true }
        );

        if (!updatedPrediction) {
            return res.status(404).json({ message: 'Prediction not found' });
        }

        res.status(200).json(updatedPrediction);
    } catch (error) {
        console.error('Error adding prediction item:', error);
        res.status(400).json({ message: error.message });
    }
};

// Delete Created Prediction
export const deletePredictionById = async (req, res) => {
    try {
        const prediction = await Prediction.findByIdAndDelete(req.params.id);
        if (!prediction) {
            return res.status(404).json({ message: 'Prediction not found' });
        }
        res.status(200).json({ message: 'Prediction deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Delete a prediction item inside an object by its ID
export const deletePredictionItemById = async (req, res) => {
    const { id, itemId } = req.params;

    try {
        const prediction = await Prediction.findByIdAndUpdate(
            id,
            { $pull: { predictions: { _id: itemId } } },
            { new: true }
        );

        if (!prediction) {
            return res.status(404).json({ message: 'Prediction not found' });
        }

        res.status(200).json({ message: 'Prediction item deleted successfully', prediction });
    } catch (error) {
        console.error('Error deleting prediction item:', error);
        return res.status(500).json({ message: error.message });
    }
};

// Edit Each Prediction Item by Id
export const EditPredictionById = async (req, res) => {
    const { id, itemId } = req.params;
    const { odds, fixtures, league, prediction, result } = req.body;

    try {
        const predictions = await Prediction.findById(id);
        if (!predictions) {
            return res.status(404).json({ message: 'Prediction not found' });
        }
        const item = predictions.predictions.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Prediction item not found' });
        }

        // Update the fields
        if (league) item.league = league;
        if (prediction) item.prediction = prediction;
        if (odds) item.odds = odds;
        if (result) item.result = result;
        if (fixtures) item.fixtures = fixtures;

        await predictions.save();

        res.status(200).json({ message: 'Prediction edited successfully', predictions });
    } catch (error) {
        console.error('Error editing prediction item:', error);
        return res.status(500).json({ message: error.message });
    }
};
