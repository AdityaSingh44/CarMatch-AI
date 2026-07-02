import express from 'express';
import { recommendCars } from '../controllers/recommendationController.js';

const router = express.Router();

router.post('/', recommendCars);

export default router;
