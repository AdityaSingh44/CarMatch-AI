# CarMatch AI

Find the right car in seconds.

CarMatch AI is an AI-native car recommendation MVP built for the CarDekho AI Native Software Engineer assignment. The goal is not to clone CarDekho. The goal is to help confused car buyers quickly discover suitable cars based on budget, family needs, driving style, and priorities.

Users can either fill a structured preference form or type a natural language request such as:

```text
I have a budget of 12 lakh, I need a safe SUV for my family, mostly for city driving.
```

The backend parses the request, scores cars from MongoDB, and returns the top recommendations with explanations.

## Features

- Structured preference form for budget, fuel type, transmission, body type, priority, family size, and driving type
- AI Prompt mode for natural language car recommendation queries
- Backend parser for budget phrases such as `12 lakh`, `15 lacs`, and rupee amounts
- Recommendation engine with weighted scoring and human-readable explanations
- Top 5 recommended cars with score, reason, image, price, mileage, safety rating, fuel type, and transmission
- Car details page with specifications, description, pros, cons, and a 7-image gallery
- Search, sort, fuel filter, body type filter, and price filter on recommendation results
- Responsive React UI with Tailwind CSS, loading states, empty states, and hover effects
- Express API with MongoDB Atlas and Mongoose
- Seed script with 50 Indian-market cars
- Environment-based setup for local development and Render deployment

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React icons

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- cors
- nodemon

## Architecture

The project is split into a Vite client and an Express API server.

- `client`: React app, pages, reusable UI components, hooks, API service layer, image fallbacks
- `server`: Express server, MongoDB config, Mongoose model, routes, controllers, middleware, seed data, recommendation utilities
- `server/utils/recommendationEngine.js`: scoring algorithm and natural-language preference parser
- `server/seed/cars.js`: 50 seeded car records with image galleries

## Folder Structure

```text
root
├── client
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── seed
│   ├── utils
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── package.json
├── .gitignore
└── README.md
```

## Installation

Install root, client, and server dependencies:

```bash
npm run install:all
```

Create the backend environment file:

```bash
cp server/.env.example server/.env
```

Update `server/.env` with your MongoDB Atlas connection string.

Create the frontend environment file if the backend API is not running on the default local URL:

```bash
cp client/.env.example client/.env
```

## Environment Variables

Backend (`server/.env`):

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carmatch-ai
CLIENT_URL=http://localhost:5173
```

Frontend (`client/.env`):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running Locally

Seed MongoDB Atlas with 50 cars:

```bash
npm run seed
```

Start frontend and backend together from the root folder:

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

Build the frontend for production:

```bash
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/cars` | Return all cars |
| `GET` | `/api/cars/:id` | Return one car by id |
| `POST` | `/api/recommend` | Return top recommended cars from structured or natural-language preferences |

### Structured Recommendation Request

```json
{
  "budget": 1200000,
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "bodyType": "SUV",
  "priority": "Safety",
  "familySize": 5,
  "drivingType": "Mixed"
}
```

### Natural Language Recommendation Request

```json
{
  "query": "I have a budget of 12 lakh, I need a safe SUV for my family, mostly for city driving."
}
```

### Recommendation Response Shape

```json
{
  "success": true,
  "count": 5,
  "preferences": {
    "budget": 1200000,
    "fuelType": "Petrol",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "priority": "Safety",
    "familySize": 5,
    "drivingType": "City"
  },
  "data": [
    {
      "make": "Tata",
      "model": "Punch",
      "recommendationScore": 100,
      "recommendationReason": "Based on your request, this car fits your budget, has an excellent safety rating, has enough seating for your family."
    }
  ]
}
```

## Database Schema

Collection: `cars`

Main fields:

- `make`
- `model`
- `variant`
- `price`
- `fuelType`
- `transmission`
- `bodyType`
- `engine`
- `mileage`
- `safetyRating`
- `seatingCapacity`
- `description`
- `image`
- `images`
- `pros`
- `cons`

## Recommendation Algorithm

Each car is scored using weighted rules:

- Budget match: up to 30 points
- Fuel match: 20 points
- Transmission match: 15 points
- Body type match: 15 points
- Priority match for mileage, safety, performance, or balanced needs: up to 15 points
- Family size match: 10 points
- Driving type fit: up to 10 points

Cars are sorted by total score, then by lower price when scores tie. The API returns the top 5 cars with `recommendationScore` and `recommendationReason`.

## AI Prompt Parsing

The natural-language parser extracts preferences from buyer sentences without requiring a paid AI API.

It can infer:

- Budget: `12 lakh`, `15 lacs`, `1200000`, `1 crore`
- Body type: SUV, Compact SUV, Sedan, Hatchback, MPV
- Fuel type: Petrol, Diesel, Electric, Hybrid, EV
- Transmission: Manual, Automatic
- Priority: Safety, Mileage, Performance, Balanced
- Family size: family of 4, 5 seater, 7 people
- Driving type: City, Highway, Mixed

This keeps the MVP deployable and deterministic while still demonstrating AI-native product thinking.

## Image Handling

Each car includes:

- One primary image for cards
- Seven gallery images for the details page
- Frontend image fallback handling to avoid broken image boxes

The current seed uses stable `images.unsplash.com` URLs so images remain visible. Exact model-specific images, such as guaranteed Maruti Suzuki Swift photos only, require either manually curated URLs per model or the official Unsplash API with an access key.

## Deployment

### Backend on Render

1. Create a new Render Web Service from this repository.
2. Set root directory to `server`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-frontend-url.onrender.com
```

After deployment, seed the production database from your local machine by temporarily setting `server/.env` to the production `MONGODB_URI`, then run:

```bash
npm run seed
```

### Frontend on Render

1. Create a new Render Static Site from this repository.
2. Set root directory to `client`.
3. Build command: `npm install && npm run build`.
4. Publish directory: `dist`.
5. Add environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

## Future Improvements

- Add curated exact image URLs for each car model
- Add a real LLM layer for richer preference extraction and conversational follow-up questions
- Add side-by-side car comparison
- Add EMI and ownership-cost estimator
- Add boot space, airbags, service network, and ground clearance filters
- Add automated API and component tests
