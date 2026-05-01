const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const User = require('../models/User');
const LoanEnquiry = require('../models/LoanEnquiry');
// ─── CARS ───────────────────────────────────────────────────────────────────
// GET all cars
router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single car by ID
router.get('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new car
router.post('/cars', async (req, res) => {
    try {
        const car = new Car(req.body);
        const saved = await car.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a car by ID
router.put('/cars/:id', async (req, res) => {
    try {
        const updated = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a car by ID
router.delete('/cars/:id', async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── BOOKINGS ────────────────────────────────────────────────────────────────
// GET all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new booking
router.post('/bookings', async (req, res) => {
    try {
        const { car, datetime } = req.body;

        // Check for duplicate booking (same car + same time slot, excluding rejected ones)
        const existing = await Booking.findOne({
            car,
            datetime,
            status: { $ne: 'Rejected' }
        });

        if (existing) {
            return res.status(409).json({
                message: 'This time slot is already booked for this vehicle. Please choose another time.'
            });
        }

        const booking = new Booking(req.body);
        const saved = await booking.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update booking status by ID
router.put('/bookings/:id', async (req, res) => {
    try {
        const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a booking by ID
router.delete('/bookings/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── USERS / AUTH ────────────────────────────────────────────────────────────
// GET all users (admin view - customers)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST register a new user
router.post('/users/register', async (req, res) => {
    try {
        const exists = await User.findOne({ email: req.body.email });
        if (exists) return res.status(409).json({ message: 'Email already registered' });
        const user = new User(req.body);
        const saved = await user.save();
        const { password, ...userData } = saved.toObject();
        res.status(201).json(userData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.password !== req.body.password) return res.status(401).json({ message: 'Invalid password' });
        const { password, ...userData } = user.toObject();
        res.json(userData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── FINANCE & LOANS ────────────────────────────────────────────────────────
// POST create a new loan enquiry
router.post('/finance/apply', async (req, res) => {
    try {
        const enquiry = new LoanEnquiry(req.body);
        const saved = await enquiry.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET all loan enquiries (admin)
router.get('/finance/enquiries', async (req, res) => {
    try {
        const enquiries = await LoanEnquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
