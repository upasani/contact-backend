const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required: [true],
        ref:"User"
    },
    name:{
        type:String,
        required: [true,"Please add the name"]
    },
    email:{
        type:String,
        required: [true,"Please add the email"]
    },
    phone:{
        type:Number,
        required: [true,"Please add the phone"]
    }
})

//after creating this schema we can add that schema using the schema of model option 

module.exports = mongoose.model("Contact",contactSchema)