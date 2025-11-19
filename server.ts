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
  'http://localhost:5173',                             // local dev
  'https://todo-frontend-three-lac.vercel.app'         // your production frontend
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['https://todo-frontend-three-lac.vercel.app'];

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps / postman
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS blocked: " + origin));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 🔥 very important for cookies/tokens
  })
);

// Preflight OPTIONS
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

// -------------------- MIDDLEWARE --------------------
app.use(express.json());

// -------------------- ROUTES --------------------
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Global Error Handler
app.use(errorHandler);

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});