import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// -------------------- CORS CONFIG --------------------
const allowedOrigins = [
  'http://localhost:5173',
  'https://todo-frontend-three-lac.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow mobile, postman, SSR

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ CORS BLOCKED:", origin);
    return callback(null, false); // do not throw errors
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// -------------------- MIDDLEWARE --------------------
app.use(express.json());

// -------------------- ROUTES --------------------
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Global Error Handler
app.use(errorHandler);

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});