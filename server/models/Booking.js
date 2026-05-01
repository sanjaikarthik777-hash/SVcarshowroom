const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    car: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    datetime: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
