const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        min: [6, 'Too Short'],
        max: [25, 'Too Long']
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    shippingAddress: {
        address: { type: String, default: ""},
        city: { type: String, default: "" },
        isEmpty: { type: Boolean, default: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);