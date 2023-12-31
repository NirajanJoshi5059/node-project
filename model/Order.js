
const mongoose = require('mongoose');


const cartSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'

    }

});


const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    orderItem: [cartSchema]


}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);