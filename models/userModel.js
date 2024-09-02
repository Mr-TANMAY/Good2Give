const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Please add a role'],
        enum: ['admin', 'organisation', 'user', 'hotel', 'stores']
    },
    name: {
        type: String,
        required: function () {
            return this.role === 'user' || this.role === 'admin';
        }
    },
    organisationName: {
        type: String,
        required: function () {
            return this.role === 'organisation';
        }
    },
    hotelName: {
        type: String,
        required: function () {
            return this.role === 'hotel';
        }
    },
    storeName: {
        type: String,  // Renamed to 'storeName' for consistency
        required: function () {
            return this.role === 'store';
        }
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    address: {
        type: String,
        required: [true, "Please provide an address"]
    },
    phone: {
        type: String,  // Changed to String to accommodate all types of phone numbers
        required: [true, "Please provide a phone number"]
    }
}, { timestamps: true });  // Corrected 'timestamp' to 'timestamps'

module.exports = mongoose.model('User', userSchema);
