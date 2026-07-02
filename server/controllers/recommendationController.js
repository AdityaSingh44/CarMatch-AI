import Car from '../models/Car.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { getTopRecommendations, parseNaturalLanguagePreferences, validatePreferences } from '../utils/recommendationEngine.js';

export const recommendCars = asyncHandler(async (req, res) => {
    const preferences = req.body.query ? parseNaturalLanguagePreferences(req.body.query) : req.body;
    const validationErrors = validatePreferences(preferences);

    if (validationErrors.length) {
        res.status(400);
        throw new Error(validationErrors.join(' '));
    }

    const cars = await Car.find({ price: { $lte: Number(preferences.budget) * 1.2 } });
    const recommendations = getTopRecommendations(cars, preferences);

    res.status(200).json({
        success: true,
        count: recommendations.length,
        preferences,
        data: recommendations,
    });
});
