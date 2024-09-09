const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true
    },
    buyer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Order', orderSchema);