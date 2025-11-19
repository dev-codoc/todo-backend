import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// Allowed frontend origin - production and local dev
const allowedOrigin =
  process.env.NODE_ENV === 'production'
    ? 'https://todo-frontend-three-lac.vercel.app'  // apni frontend Vercel URL
    : 'http://localhost:5173';                       // local vite dev server

// CORS middleware setup
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  })
);

// Preflight OPTIONS requests ke liye cors
app.options('*', cors({ origin: allowedOrigin }));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Error handler (last middleware)
app.use(errorHandler);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
