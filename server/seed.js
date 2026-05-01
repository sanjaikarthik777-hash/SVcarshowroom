/**
 * Run this once to clear old car data and re-seed with Rupee prices:
 *   node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');

const cars = [
    { name: "BMW M4", brand: "BMW", price: "₹1,20,00,000", images: ["https://images.unsplash.com/photo-1614026480209-cd9934144671?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1681856447108-4cc76fff51c2?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1612545667889-b061512d0dfa?w=600&auto=format&fit=crop&q=60"], description: "The BMW M4 is a high-performance luxury sports coupe designed for drivers who demand power, precision, and comfort." },
    { name: "Audi R8", brand: "Audi", price: "₹2,55,00,000", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70","https://images.unsplash.com/photo-1493238792000-8113da705763","https://images.unsplash.com/photo-1604705528621-81b2755a320b?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1610880846497-7257b23f6138?w=600&auto=format&fit=crop&q=60"], description: "The Audi R8 is a premium supercar combining luxury with extreme performance, featuring a V10 engine and Quattro AWD." },
    { name: "Mercedes-Benz AMG", brand: "Mercedes-Benz", price: "₹1,65,00,000", images: ["https://images.unsplash.com/photo-1614200187524-dc4b892acf16","https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9","https://images.unsplash.com/photo-1590216255837-24412b004996?w=600&auto=format&fit=crop&q=60"], description: "Mercedes-Benz AMG combines luxury with high-performance engineering, hand-built engines, and advanced safety features." },
    { name: "Lamborghini Huracán", brand: "Lamborghini", price: "₹3,50,00,000", images: ["https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=600","https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600","https://images.unsplash.com/photo-1570294646112-27ce4f174e38?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?w=600&auto=format&fit=crop&q=60"], description: "The Lamborghini Huracán is an Italian supercar with a V10 engine, aggressive styling, and driver-focused cockpit." },
    { name: "Porsche 911", brand: "Porsche", price: "₹2,00,00,000", images: ["https://images.unsplash.com/photo-1593353798398-6024b7444bb6?w=600","https://images.unsplash.com/photo-1634673970798-a15ae56f6c65?w=600","https://images.unsplash.com/photo-1732624696535-68022a5b84dc?w=600&auto=format&fit=crop&q=60"], description: "The Porsche 911 is a legendary sports car known for its timeless design and exceptional driving performance." },
    { name: "Ford Mustang GT", brand: "Ford", price: "₹75,00,000", images: ["https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9","https://images.unsplash.com/photo-1690235709293-6de0ba349eab?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1547744152-14d985cb937f?w=600&auto=format&fit=crop&q=60"], description: "Classic American muscle car with a powerful V8 engine, modern infotainment, and iconic design." },
    { name: "Chevrolet Camaro", brand: "Chevrolet", price: "₹68,00,000", images: ["https://images.unsplash.com/photo-1619767886558-efdc259cde1a","https://images.unsplash.com/photo-1553440569-bcc63803a83d","https://images.unsplash.com/photo-1615769516664-ca7302760b23?w=600&auto=format&fit=crop&q=60"], description: "Modern sports car with powerful engines, fast acceleration, and aggressive styling." },
    { name: "Tesla Model S", brand: "Tesla", price: "₹1,40,00,000", images: ["https://images.unsplash.com/photo-1614200187524-dc4b892acf16","https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2","https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=60"], description: "Luxury electric sedan with instant acceleration, autopilot, and minimalist interior." },
    { name: "Range Rover Sport", brand: "Land Rover", price: "₹1,80,00,000", images: ["https://images.unsplash.com/photo-1600016326108-40b24ee22cd3?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1679506640602-0144b3bb5053?w=600&auto=format&fit=crop&q=60"], description: "Luxury SUV designed for comfort and performance, advanced off-road capabilities, and smooth city driving." },
    { name: "Jaguar F-Type", brand: "Jaguar", price: "₹1,70,00,000", images: ["https://images.unsplash.com/photo-1620547316190-289b3899e010?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1602013871952-8379f19a15f1?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=600&auto=format&fit=crop&q=60"], description: "Luxury sports car with elegant British design, smooth acceleration, and advanced technology." },
    { name: "BUGATTI CHIRON", brand: "Bugatti", price: "₹24,00,00,000", images: ["https://images.unsplash.com/photo-1566023888476-6f17e362fbb7?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1635975229704-0a420e777a56?w=600&auto=format&fit=crop&q=60"], description: "The Chiron is a pinnacle of automotive engineering, combining immense power with high-end luxury." },
    { name: "ROLLS ROYCE", brand: "Rolls-Royce", price: "₹8,00,00,000", images: ["https://images.unsplash.com/photo-1578564810934-c131250d3792?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1607465511939-92cd96b8c3f5?w=600&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1624804269473-828dcc30a210?w=600&auto=format&fit=crop&q=60"], description: "Rolls-Royce represents the pinnacle of bespoke luxury, with models typically starting from ₹8 Crore." },
];

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Car.deleteMany({});
    console.log('🗑  Cleared old cars');

    await Car.insertMany(cars);
    console.log(`🚗  Seeded ${cars.length} cars with ₹ prices`);

    await mongoose.disconnect();
    console.log('👋 Done!');
}

seed().catch(err => { console.error(err); process.exit(1); });
