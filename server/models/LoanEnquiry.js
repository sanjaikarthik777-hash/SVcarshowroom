const mongoose = require('mongoose');

const loanEnquirySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional, if user is logged in
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    carBrand: { type: String, required: true },
    carModel: { type: String, required: true },
    carPrice: { type: Number, required: true },
    loanAmount: { type: Number, required: true },
    downPayment: { type: Number, default: 0 },
    interestRate: { type: Number, required: true },
    tenureMonths: { type: Number, required: true },
    monthlyEmi: { type: Number, required: true },
    totalPayable: { type: Number, required: true },
    financeProvider: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Processing', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoanEnquiry', loanEnquirySchema);
