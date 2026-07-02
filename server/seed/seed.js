import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Car from '../models/Car.js';
import { cars } from './cars.js';

dotenv.config();

async function seedCars() {
    try {
        await connectDB();
        await Car.deleteMany({});
        await Car.insertMany(cars);
        console.log(`Seeded ${cars.length} cars successfully`);
    } catch (error) {
        console.error(`Seed failed: ${error.message}`);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
}

seedCars();
