# CarMatch AI

Find the right car in seconds.

CarMatch AI is a production-ready MVP for helping confused Indian car buyers discover the best cars for their needs. Instead of browsing hundreds of listings, users answer a short preference form and receive ranked recommendations with clear explanations.

## Features

- Intelligent recommendation flow based on budget, fuel, transmission, body type, family size, driving type, and priority
- Top 5 recommended cars with score and explanation
- Car details page with specifications, pros, cons, and description
- Search, sort, and filter tools on recommendation results
- Responsive React 19 UI with Tailwind CSS
- Express API with MongoDB Atlas and Mongoose
- Seed script with 50 Indian car records
- Environment-based configuration for deployability

## Architecture

The application uses a split frontend/backend structure:

- `client`: React 19, Vite, React Router DOM, Tailwind CSS, Axios
- `server`: Node.js, Express.js, Mongoose, MongoDB Atlas, dotenv, cors
- `server/utils/recommendationEngine.js`: scoring logic that ranks cars from MongoDB

## Folder Structure

```text
root
├── client
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── seed
│   ├── utils
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## Installation

```bash
npm run install:all
```

Create the backend environment file:

```bash
cp server/.env.example server/.env
```

Update `server/.env` with your MongoDB Atlas connection string.

Create the frontend environment file if the API is not running on the default local URL:

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

Seed MongoDB Atlas:

```bash
npm run seed
```

Start frontend and backend together:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/cars` | Return all cars |
| `GET` | `/api/cars/:id` | Return one car by id |
| `POST` | `/api/recommend` | Return top recommended cars |

Example recommendation request:

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

## Recommendation Algorithm

Each car is scored using weighted rules:

- Budget match: up to 30 points
- Fuel match: 20 points
- Transmission match: 15 points
- Body type match: 15 points
- Priority match for mileage, safety, performance, or balanced needs: up to 15 points
- Family size match: 10 points
- Driving type fit: up to 10 points

Cars are sorted by total score and the API returns the top 5 with `recommendationScore` and `recommendationReason`.

## Deployment

### Backend on Render

1. Create a new Render Web Service from this repository.
2. Set root directory to `server`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add `PORT`, `MONGODB_URI`, and `CLIENT_URL` environment variables.

### Frontend on Render

1. Create a new Render Static Site from this repository.
2. Set root directory to `client`.
3. Build command: `npm install && npm run build`.
4. Publish directory: `dist`.
5. Add `VITE_API_BASE_URL` pointing to the deployed backend API URL.

## Future Improvements

- Add AI-generated natural language recommendation summaries
- Add ownership cost estimates and EMI calculators
- Add side-by-side comparison
- Add richer filters for airbags, boot space, and service network
- Add analytics for most common buyer preferences
