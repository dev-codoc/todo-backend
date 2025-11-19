"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Errorlog_1 = __importDefault(require("../models/Errorlog"));
const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    // Log error to MongoDB
    try {
        await Errorlog_1.default.create({
            message: err.message || 'Internal Server Error',
            stack: err.stack,
            route: req.originalUrl,
            method: req.method,
            statusCode,
            user: req.user?._id
        });
    }
    catch (logError) {
        console.error('Failed to log error:', logError);
    }
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
exports.errorHandler = errorHandler;
