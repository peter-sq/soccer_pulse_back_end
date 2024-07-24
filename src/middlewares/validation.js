import { body, validationResult } from 'express-validator';

// Validation middleware
export const validatePredictions = [
    body('time').notEmpty().withMessage("Time is empty"),
    body('fixtures').notEmpty().withMessage("Fixture must not be empty"),
    body('odds').notEmpty().withMessage("Odds must not be empty"),
    body('prediction').notEmpty().withMessage("Prediction must not be empty"),
    body('result').optional(),
];

// Handle validation errors middleware
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};