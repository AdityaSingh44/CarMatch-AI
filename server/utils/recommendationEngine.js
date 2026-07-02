const requiredFields = ['budget', 'fuelType', 'transmission', 'bodyType', 'priority', 'familySize', 'drivingType'];

const defaultPreferences = {
    budget: 1200000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    priority: 'Balanced',
    familySize: 5,
    drivingType: 'Mixed',
};

export function validatePreferences(preferences) {
    const errors = [];

    requiredFields.forEach((field) => {
        if (preferences[field] === undefined || preferences[field] === '') {
            errors.push(`${field} is required.`);
        }
    });

    if (preferences.budget && Number(preferences.budget) < 300000) {
        errors.push('Budget must be at least Rs. 3,00,000.');
    }

    return errors;
}

function parseBudget(query) {
    const compactQuery = query.replace(/,/g, '').toLowerCase();
    const lakhMatch = compactQuery.match(/(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|l)/);
    const croreMatch = compactQuery.match(/(\d+(?:\.\d+)?)\s*(crore|crores|cr)/);
    const rupeeMatch = compactQuery.match(/(?:rs\.?|inr|₹)?\s*(\d{6,8})/);

    if (croreMatch) return Math.round(Number(croreMatch[1]) * 10000000);
    if (lakhMatch) return Math.round(Number(lakhMatch[1]) * 100000);
    if (rupeeMatch) return Number(rupeeMatch[1]);
    return defaultPreferences.budget;
}

function findOption(query, options, fallback) {
    return options.find((option) => query.includes(option.toLowerCase())) || fallback;
}

export function parseNaturalLanguagePreferences(query) {
    const text = String(query || '').toLowerCase();
    const familyMatch = text.match(/(?:family of|family size|we are|members?|people|seats?|seater)\s*(\d+)/);
    const explicitSeatMatch = text.match(/(\d+)\s*(?:seater|seat|seats|people|members)/);

    const priority = text.includes('safe') || text.includes('safety') || text.includes('airbag')
        ? 'Safety'
        : text.includes('mileage') || text.includes('fuel efficient') || text.includes('efficient') || text.includes('economy')
            ? 'Mileage'
            : text.includes('performance') || text.includes('power') || text.includes('fast') || text.includes('turbo')
                ? 'Performance'
                : 'Balanced';

    const inferredBodyType = text.includes('compact suv')
        ? 'Compact SUV'
        : findOption(text, ['SUV', 'Sedan', 'Hatchback', 'MPV'], defaultPreferences.bodyType);

    const inferredFuelType = text.includes('ev')
        ? 'Electric'
        : findOption(text, ['Petrol', 'Diesel', 'Electric', 'Hybrid'], defaultPreferences.fuelType);

    const inferredDrivingType = text.includes('highway') || text.includes('long drive') || text.includes('long distance')
        ? 'Highway'
        : text.includes('city') || text.includes('traffic') || text.includes('urban')
            ? 'City'
            : 'Mixed';

    return {
        budget: parseBudget(text),
        fuelType: inferredFuelType,
        transmission: findOption(text, ['Manual', 'Automatic'], defaultPreferences.transmission),
        bodyType: inferredBodyType,
        priority,
        familySize: Number(familyMatch?.[1] || explicitSeatMatch?.[1] || defaultPreferences.familySize),
        drivingType: inferredDrivingType,
        query,
    };
}

function getBudgetScore(carPrice, budget) {
    if (carPrice <= budget) return 30;
    if (carPrice <= budget * 1.1) return 20;
    if (carPrice <= budget * 1.2) return 10;
    return 0;
}

function getPriorityScore(car, priority) {
    if (priority === 'Mileage') return Math.min(15, Math.round((car.mileage / 30) * 15));
    if (priority === 'Safety') return Math.round((car.safetyRating / 5) * 15);
    if (priority === 'Performance') return /turbo|tsi|tgdi|diesel|electric|hybrid/i.test(car.engine) ? 15 : 8;
    return Math.round(((car.mileage / 30) * 7.5) + ((car.safetyRating / 5) * 7.5));
}

function getDrivingTypeScore(car, drivingType) {
    if (drivingType === 'City') {
        if (car.fuelType === 'Electric' || car.bodyType === 'Hatchback' || car.bodyType === 'Compact SUV') return 10;
        return 6;
    }

    if (drivingType === 'Highway') {
        if (car.safetyRating >= 4 && ['Sedan', 'SUV', 'MPV'].includes(car.bodyType)) return 10;
        return 6;
    }

    return 8;
}

function buildReason(car, preferences) {
    const reasons = [];

    if (car.price <= Number(preferences.budget)) reasons.push('fits your budget');
    if (car.fuelType === preferences.fuelType) reasons.push(`matches your ${preferences.fuelType.toLowerCase()} preference`);
    if (preferences.priority === 'Safety' && car.safetyRating >= 4.5) reasons.push('has an excellent safety rating');
    if (preferences.priority === 'Mileage' && car.mileage >= 20) reasons.push('offers strong mileage');
    if (Number(preferences.familySize) <= car.seatingCapacity) reasons.push('has enough seating for your family');

    if (preferences.query && reasons.length) {
        return `Based on your request, this car ${reasons.slice(0, 3).join(', ')}.`;
    }

    if (!reasons.length) {
        return preferences.query ? 'Based on your request, this is a balanced option that closely matches your needs.' : 'A balanced option that closely matches your selected preferences.';
    }

    return `${reasons.slice(0, 3).join(', ')}.`.replace(/^./, (letter) => letter.toUpperCase());
}

export function scoreCar(car, preferences) {
    let score = 0;
    const budget = Number(preferences.budget);
    const familySize = Number(preferences.familySize);

    score += getBudgetScore(car.price, budget);
    if (car.fuelType === preferences.fuelType) score += 20;
    if (car.transmission === preferences.transmission) score += 15;
    if (car.bodyType === preferences.bodyType) score += 15;
    score += getPriorityScore(car, preferences.priority);
    if (car.seatingCapacity >= familySize) score += 10;
    score += getDrivingTypeScore(car, preferences.drivingType);

    return Math.min(100, score);
}

export function getTopRecommendations(cars, preferences, limit = 5) {
    return cars
        .map((car) => {
            const recommendationScore = scoreCar(car, preferences);
            const carObject = typeof car.toObject === 'function' ? car.toObject() : car;

            return {
                ...carObject,
                recommendationScore,
                recommendationReason: buildReason(carObject, preferences),
            };
        })
        .sort((first, second) => second.recommendationScore - first.recommendationScore || first.price - second.price)
        .slice(0, limit);
}
