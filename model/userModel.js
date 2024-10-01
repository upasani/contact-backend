const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"]
    },
    email: {
        type: String,
        required: [true, "Please enter the email"],
        unique: [true, "Email is unique"]
    },
    password: {
        type: String,
        required: [true, 'please enter the password ']
    }
})

module.exports = mongoose.model("User",userSchema);