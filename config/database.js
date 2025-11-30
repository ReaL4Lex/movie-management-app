const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
        });

        console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`👤 User: folarinajisegiri_db_user`);

        // Event handlers for better debugging
        mongoose.connection.on('connected', () => {
            console.log('🎯 Mongoose connected to Cluster0.4vderdr.mongodb.net');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ Mongoose disconnected from MongoDB Atlas');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ MongoDB Atlas connection failed:');
        console.error('   Error:', error.message);
        console.log('🔧 Troubleshooting your specific cluster:');
        console.log('   1. Check if Cluster0.4vderdr.mongodb.net is running');
        console.log('   2. Verify username: folarinajisegiri_db_user');
        console.log('   3. Ensure IP 0.0.0.0/0 is whitelisted in Atlas');
        console.log('   4. Check internet connection');
        process.exit(1);
    }
};

module.exports = connectDB;
