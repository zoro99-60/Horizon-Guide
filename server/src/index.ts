import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', apiRoutes);

// Basic Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
    console.log(`[${new Date().toISOString()}] 404 NOT FOUND: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Route ${req.url} not found on this server` });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Database connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/horizonguide';

mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => {
        console.log('✅ MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('💡 Tip: Ensure MongoDB is installed and running at: ' + mongoUri);
    });
