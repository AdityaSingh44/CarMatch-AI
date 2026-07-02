import Car from '../models/Car.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getCars = asyncHandler(async (req, res) => {
    const { search, fuelType, bodyType, minPrice, maxPrice, sort = 'price' } = req.query;
    const query = {};

    if (search) {
        query.$or = [
            { make: { $regex: search, $options: 'i' } },
            { model: { $regex: search, $options: 'i' } },
            { variant: { $regex: search, $options: 'i' } },
        ];
    }

    if (fuelType) query.fuelType = fuelType;
    if (bodyType) query.bodyType = bodyType;
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortMap = {
        price: { price: 1 },
        '-price': { price: -1 },
        mileage: { mileage: -1 },
        safety: { safetyRating: -1 },
    };

    const cars = await Car.find(query).sort(sortMap[sort] || sortMap.price);

    res.status(200).json({ success: true, count: cars.length, data: cars });
});

export const getCarById = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);

    if (!car) {
        res.status(404);
        throw new Error('Car not found');
    }

    res.status(200).json({ success: true, data: car });
});
