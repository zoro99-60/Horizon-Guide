import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/horizonguide';

async function verify() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri);
        console.log('✅ Connected successfully');

        console.log('Verifying collections...');
        // Just checking if we can count documents in User (it will be 0 initially)
        const count = await User.countDocuments();
        console.log(`Current user count: ${count}`);

        console.log('Database and User collection are READY.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error);
        process.exit(1);
    }
}

verify();
