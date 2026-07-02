import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
    {
        make: { type: String, required: true, trim: true },
        model: { type: String, required: true, trim: true },
        variant: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        fuelType: { type: String, required: true, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
        transmission: { type: String, required: true, enum: ['Manual', 'Automatic'] },
        bodyType: { type: String, required: true, enum: ['SUV', 'Sedan', 'Hatchback', 'Compact SUV', 'MPV'] },
        engine: { type: String, required: true },
        mileage: { type: Number, required: true, min: 0 },
        safetyRating: { type: Number, required: true, min: 0, max: 5 },
        seatingCapacity: { type: Number, required: true, min: 2, max: 8 },
        description: { type: String, required: true },
        image: { type: String, required: true },
        images: [{ type: String, required: true }],
        pros: [{ type: String, required: true }],
        cons: [{ type: String, required: true }],
    },
    { timestamps: true },
);

carSchema.index({ make: 1, model: 1 });
carSchema.index({ price: 1, fuelType: 1, bodyType: 1 });

export default mongoose.model('Car', carSchema);
