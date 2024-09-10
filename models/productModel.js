const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    discountedPrice: {
        type: String,
        required: true,
    },
    expiryDate:{
        type:  String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    listedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },

    status:{
        type: String,
        enum: ['available','pending','sold'],
        default: 'available',
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Product', productSchema)   