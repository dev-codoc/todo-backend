import { Request, Response, NextFunction } from 'express';
import ErrorLog from '../models/Errorlog';
import { AuthRequest } from './authMiddleware';

export const errorHandler = async (  
  err: any,
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  
  // Log error to MongoDB
  try {
    await ErrorLog.create({
      message: err.message || 'Internal Server Error',
      stack: err.stack,
      route: req.originalUrl,
      method: req.method,
      statusCode,
      user: req.user?._id
    });
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};