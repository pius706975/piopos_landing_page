import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL || '';

if (!MONGODB_URL) {
    console.error('Missing environment variable: MONGODB_URL');
    process.exit(1);
}

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(MONGODB_URL, {
            dbName: 'pioposlp',
            connectTimeoutMS: 50000,
            socketTimeoutMS: 75000, 
        });

        console.log('MongoDB is connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};
