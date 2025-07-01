const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/chatbot-builder', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
