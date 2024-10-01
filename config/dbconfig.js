// mongodb+srv://upasanivaibhav7:admin@cluster0.yavxx.mongodb.net/

const mongoose = require('mongoose')

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.connection_string);
}

module.exports = connectDB;
