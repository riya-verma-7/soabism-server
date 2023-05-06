const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: true,

    },
    email: {
        type: String,
        trim: true,
        required: true,

    },
    number: {
        type: Number,
        trim: true

    },
    msg: {
        type: String,
        trim: true,
        required: true
    }

})
module.exports = mongoose.model("User", userSchema)