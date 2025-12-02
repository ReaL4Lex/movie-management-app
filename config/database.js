const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://MovieManagement:adminadmin@cluster0.4vderdr.mongodb.net/movieapp?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);

        // Week 4 - Event handling
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

    } catch (error) {
        console.error('❌ MongoDB Atlas connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
