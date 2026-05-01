const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: String, required: true },
    images: [String],
    description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
