const mongoose = require('mongoose');

const dbConnect  = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL); 
        console.log('Database connected');
    } catch (error) {
        throw error;
    }
}

module.exports = dbConnect;


