import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, RotateCcw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars } from '../data';
import { API_BASE } from '../api';

// ─── Knowledge Base ──────────────────────────────────────────────────────────
const KB = {
    greetings: {
        patterns: [/^(hi|hello|hey|good\s?(morning|evening|afternoon)|greetings|sup|yo)\b/i],
        replies: [
            "Welcome to **Luxury Auto Showcase** 🏎️ — your gateway to the world's finest automobiles. How can I assist your automotive journey today?",
            "Good day! I'm your personal automotive concierge. Whether you're exploring supercars, luxury sedans, or arranging a private test drive — I'm here to help.",
        ]
    },
    inventory: {
        patterns: [/inventory|stock|available|what cars|show me|collection|catalogue|catalog/i],
        reply: `Our showroom features **7 exclusive categories**:\n\n🏅 **Luxury Sedans** — Mercedes S-Class, BMW 7 Series, Audi A8\n🔥 **Sports Cars** — Porsche 911, Corvette Z06\n⚡ **Supercars** — Lamborghini Huracán, Ferrari F8, McLaren 720S\n🌄 **Luxury SUVs** — Range Rover Autobiography, Mercedes-AMG G63\n🔋 **Electric Cars** — Porsche Taycan Turbo S, Lucid Air\n✨ **New Arrivals** — Rolls-Royce Spectre, Ferrari Purosangue\n🌟 **Featured** — Bugatti Chiron Super Sport, Aston Martin Valkyrie\n\nWhich category would you like to explore?`
    },
    price: {
        patterns: [/price|pricing|cost|how much|budget|afford|value|worth/i],
        reply: `Our collection spans a wide investment range:\n\n💎 **Entry Luxury** — From $72,000 (BMW M4)\n🏆 **Ultra Luxury** — $88K–$420K (Audi A8 → Rolls-Royce Spectre)\n⚡ **Supercars** — $248K–$305K (Lamborghini, Ferrari, McLaren)\n👑 **Hypercars** — $3.2M–$3.8M (Aston Valkyrie, Bugatti Chiron)\n\nWould you like financing options or a specific model's price?`
    },
    mercedes: {
        patterns: [/mercedes|s.?class|amg g|g63|g.?wagen/i],
        reply: `We carry two exceptional Mercedes-Benz models:\n\n🖤 **S-Class** — $114,500 | V8 engine, massage seats, driver-assist suite\n💪 **AMG G 63** — $179,000 | BiTurbo V8, iconic design, brutal performance\n\nThe S-Class is the pinnacle of executive comfort; the G63 is a statement of unstoppable presence. Would you like to arrange a viewing or test drive?`
    },
    bmw: {
        patterns: [/bmw|7.?series|m4/i],
        reply: `Our BMW lineup:\n\n🎭 **BMW 7 Series** — $96,400 | Hybrid powertrain, rear-seat theater screen, executive lounge\n🏁 **BMW M4** — $72,000 | Twin-turbo inline-6, track-tuned chassis, M xDrive\n\nBoth represent the ultimate in Bavarian engineering. Which interests you more — the executive or the performance route?`
    },
    audi: {
        patterns: [/audi|a8|quattro/i],
        reply: `✦ **Audi A8** — $88,900\n\nThe flagship sedan offering Quattro AWD, air suspension, predictive active suspension, and a hand-stitched leather cabin. Understated elegance with technology that anticipates your every need.\n\nShall I arrange a private viewing?`
    },
    porsche: {
        patterns: [/porsche|911|carrera|taycan/i],
        reply: `Porsche is represented in two exceptional ways:\n\n🏎️ **911 Carrera** — $114,400 | Iconic flat-6, PDK gearbox, 60 years of motorsport DNA\n⚡ **Taycan Turbo S** — $187,400 | 800V electric architecture, 2.6s 0-60, zero compromise\n\nBoth deliver the same Porsche promise: precision, pure joy. Which speaks to you?`
    },
    ferrari: {
        patterns: [/ferrari|f8|tributo|purosangue/i],
        reply: `The Prancing Horse roars in our showroom:\n\n🔴 **Ferrari F8 Tributo** — $280,000 | Twin-Turbo V8, 710hp, pure RWD emotion\n🦅 **Ferrari Purosangue** — $398,350 | V12 engine, 4-door 4-seater, active suspension\n\nEvery Ferrari is a rolling piece of art. The F8 is raw passion; the Purosangue is a revolutionary family supercar. Interested in a private test drive?`
    },
    lamborghini: {
        patterns: [/lamborghini|huracan|hurac[aá]n|urus|lambo/i],
        reply: `🟡 **Lamborghini Huracán Evo** — $248,295\n\nNaturally aspirated 5.2L V10 producing 640hp, all-wheel drive torque vectoring, and the most visceral soundtrack in automotive history. Available in Allegra, Senso, or Corsa drive modes.\n\nThis is presence redefined. Shall I arrange a private showroom appointment?`
    },
    mclaren: {
        patterns: [/mclaren|720s|765lt/i],
        reply: `🟠 **McLaren 720S** — $305,000\n\nWoven carbon fibre monocoque, 4.0L twin-turbo V8 producing 710hp, active aerodynamics, and a 0-60 of 2.8 seconds. The most driver-focused supercar we carry.\n\nMcLaren offers a bespoke configuration service through us. Would you like to design yours?`
    },
    bugatti: {
        patterns: [/bugatti|chiron|veyron/i],
        reply: `👑 **Bugatti Chiron Super Sport** — $3,825,000\n\nThe pinnacle of human automotive engineering. 8.0L quad-turbocharged W16 producing 1,578 horsepower, a 300+ mph top speed, and a cabin hand-crafted to your exact specification.\n\nOnly a handful are allocated globally. Our team can facilitate the acquisition process discretely. Shall we connect you with our hypercar specialist?`
    },
    astonmartin: {
        patterns: [/aston.?martin|valkyrie|vantage|dbx/i],
        reply: `⚫ **Aston Martin Valkyrie** — $3,200,000\n\nA collaboration between Aston Martin and Red Bull Racing. Cosworth-built V12 with KERS hybrid system delivering Formula 1 performance for the road. Only 150 road-legal units were ever produced.\n\nThis transcends the definition of a car. Shall I connect you with our specialist?`
    },
    rollsroyce: {
        patterns: [/rolls.?royce|spectre|phantom|ghost|cullinan/i],
        reply: `⬛ **Rolls-Royce Spectre** — $420,000\n\nThe world's first ultra-luxury electric super coupe. 585hp electric drivetrain, Starlight Headliner with 1,340 individually illuminated fibre optics, and a bespoke interior limited only by your imagination.\n\nEvery Spectre is a minimum 4-month bespoke commission process. We hold one in inventory for immediate acquisition. Shall we schedule a private viewing?`
    },
    rangerover: {
        patterns: [/range.?rover|autobiography|land.?rover/i],
        reply: `🌿 **Range Rover Autobiography** — $141,100\n\nThe definitive luxury SUV. Air suspension, Terrain Response 2, rear executive seats with 24-way massage, and a cabin that rivals any private jet. Effortlessly composed on any terrain.\n\nWould you like to explore colour and specification options?`
    },
    electric: {
        patterns: [/electric|ev|battery|zero.?emission|lucid|hybrid/i],
        reply: `Our electric & hybrid collection:\n\n⚡ **Porsche Taycan Turbo S** — $187,400 | 750hp, 2.6s 0-60, 800V fast-charging\n🌙 **Lucid Air Dream Edition** — $169,000 | 1,111hp, 520-mile range (longest EV range ever)\n🔋 **Rolls-Royce Spectre** — $420,000 | Silent luxury redefined\n\nAll three represent the future without compromise. Which interests you?`
    },
    suv: {
        patterns: [/suv|4x4|crossover|off.?road|family car|family vehicle/i],
        reply: `Our Luxury SUV collection:\n\n🌿 **Range Rover Autobiography** — $141,100 | Air suspension, executive rear suite\n💪 **Mercedes-AMG G 63** — $179,000 | BiTurbo V8, icon status, pure authority\n\nBoth offer commanding road presence. The Range Rover prioritises composed luxury; the G63 delivers unapologetic power. Which resonates with your needs?`
    },
    concierge: {
        patterns: [/concierge|vip|white.?glove|delivery|source|import|export|warranty|insurance/i],
        reply: `🎖️ **Our VIP Concierge Services:**\n\n• 🌍 **International Sourcing** — Any car, anywhere in the world\n• 🚗 **White-Glove Delivery** — Delivered to your door, worldwide\n• 🛡️ **Extended Warranty** — Up to 7 years comprehensive coverage\n• 💎 **Bespoke Configuration** — Custom paint, interior, and options\n• ✈️ **Private Transfer** — Airport to showroom in a loaner vehicle\n\nOur concierge team is available 24/7. Visit the **Services** tab for full details or would you like to speak to a specialist?`
    },
    finance: {
        patterns: [/finance|financing|loan|monthly|payment|lease|leasing|installment/i],
        reply: `💳 **Financing & Leasing Options:**\n\n• **Flexible Terms** — 24 to 84 month financing\n• **Competitive APR** — From 3.9% for qualified buyers\n• **Balloon Payment** — Lower monthly costs with end-of-term buyout\n• **Operating Lease** — Drive more, commit less\n• **Full Ownership** — Traditional purchase with title\n\nOur finance specialists can structure a custom plan. Which model are you considering? I'll calculate an estimate.`
    },
    compare: {
        patterns: [/compare|vs|versus|difference|better|which is|recommendation|recommend|suggest|best/i],
        reply: `🔍 **Looking for a recommendation?** Here are our top picks by category:\n\n🏆 **Best Daily Luxury** — Mercedes S-Class (refined, tech-loaded)\n🏁 **Best Driver's Car** — Porsche 911 Carrera (pure, iconic)\n⚡ **Best EV** — Porsche Taycan Turbo S (fastest-charging, most fun)\n🌟 **Best Supercar Value** — Ferrari F8 Tributo (raw emotion per dollar)\n👨‍👩‍👧 **Best Family Supercar** — Ferrari Purosangue (4 seats, V12)\n👑 **Most Exclusive** — Bugatti Chiron Super Sport\n\nTell me your priorities (performance / comfort / exclusivity / practicality) and I'll narrow it down for you.`
    },
    contact: {
        patterns: [/contact|call|phone|email|reach|address|location|where are you|opening.?hours|hours/i],
        reply: `📍 **Contact & Location:**\n\n🏢 **Showroom** — 1 Luxury Drive, Beverly Hills, CA 90210\n📞 **Phone** — +1 (800) LUXURY-1\n📧 **Email** — concierge@luxuryautoshowcase.com\n⏰ **Hours** — Mon–Sat: 9AM–8PM | Sun: 11AM–6PM\n🌐 **Private appointments** available outside business hours\n\nWould you like to schedule a visit?`
    },
    thanks: {
        patterns: [/thank|thanks|appreciate|great|awesome|perfect|helpful|good bot/i],
        reply: `You're very welcome! 🙏 It's our privilege to assist you. Is there anything else I can help you with — whether it's specifications, pricing, availability, or arranging a private experience?`
    },
    farewell: {
        patterns: [/bye|goodbye|see you|later|that's all|nothing else|done/i],
        reply: `Thank you for visiting **Luxury Auto Showcase**. We hope to welcome you to our showroom soon. Drive beautifully! 🏎️✨`
    },
};

// Available time slots (same as BookingPage)
const TIME_SLOTS = [
    '09:00 AM – 09:30 AM',
    '10:00 AM – 10:30 AM',
    '11:00 AM – 11:30 AM',
    '12:00 PM – 12:30 PM',
    '02:00 PM – 02:30 PM',
    '03:00 PM – 03:30 PM',
    '04:00 PM – 04:30 PM',
    '05:00 PM – 05:30 PM',
];

// ─── Driving Report System ────────────────────────────────────────────────────
const DRIVING_REPORT_PATTERNS = [/driving.?report|drive.?report|my.?report|test.?drive.?report|performance.?report|how.?did.?i.?drive|driving.?score|my.?score/i];

function generateDrivingMetrics() {
    // Simulate realistic driving scores with slight randomization
    const smoothness = Math.floor(55 + Math.random() * 45); // 55-99
    const braking = Math.floor(50 + Math.random() * 50);     // 50-99
    const acceleration = Math.floor(50 + Math.random() * 50); // 50-99
    const eco = Math.floor(45 + Math.random() * 55);          // 45-99
    return { smoothness, braking, acceleration, eco };
}

function getDrivingBadge(scores) {
    const { smoothness, braking, acceleration, eco } = scores;
    const allHigh = smoothness > 75 && braking > 75 && acceleration > 75 && eco > 75;
    const balanced = smoothness > 70 && braking > 70 && Math.abs(smoothness - braking) <= 15;
    const sporty = acceleration > 75 && braking < 60;
    const maxScore = Math.max(smoothness, braking, acceleration, eco);

    if (allHigh) return { badge: '👑 Master Driver', color: '#d4af37', desc: 'The pinnacle of driving finesse' };
    if (sporty) return { badge: '⚡ Sporty Driver', color: '#f97316', desc: 'Born for the fast lane' };
    if (eco === maxScore && eco > 75) return { badge: '🌱 Eco Driver', color: '#22c55e', desc: 'Smooth, efficient, planet-conscious' };
    if (acceleration === maxScore && acceleration > 75) return { badge: '🏎 Performance Racer', color: '#ef4444', desc: 'Throttle is your best friend' };
    if (balanced) return { badge: '🛡 Safe Driver', color: '#3b82f6', desc: 'Controlled, composed, confident' };
    // Fallback
    return { badge: '🚗 Spirited Driver', color: '#a78bfa', desc: 'A unique style all your own' };
}

function getDrivingSummary(scores, badge) {
    const { smoothness, braking, acceleration, eco } = scores;
    const badgeName = badge.badge;

    if (badgeName.includes('Master')) {
        return "You drove like a true automotive connoisseur — smooth steering, perfectly timed brakes, confident acceleration, and an eco-conscious touch. Our driving instructors would be impressed! The car responded to you like it was made for your hands.";
    }
    if (badgeName.includes('Sporty')) {
        return `You weren't here for a Sunday cruise, were you? 😏 That acceleration was bold and decisive — you pushed the car with real intent! Your braking was a tad aggressive (${braking}/100), but honestly, that just means you know how to have fun. This car clearly awakened something in you.`;
    }
    if (badgeName.includes('Eco')) {
        return `Gentle on the throttle, smooth on the curves, and kind to the planet — you're the driver every electric car dreams of! Your eco score of ${eco}/100 is genuinely impressive. You extracted maximum efficiency while still enjoying every moment behind the wheel.`;
    }
    if (badgeName.includes('Performance')) {
        return `You unleashed the beast! That acceleration pattern (${acceleration}/100) tells us you wanted to feel every horsepower under your right foot. The way you attacked the straights was pure motorsport energy. This car was smiling the entire time — and so were you, we suspect.`;
    }
    if (badgeName.includes('Safe')) {
        return `Smooth, composed, and always in control — you drove like someone who truly respects the machine. Your balance between smoothness (${smoothness}/100) and brake control (${braking}/100) was textbook perfect. Insurance companies would love you, but more importantly, so would this car.`;
    }
    return `An interesting drive with your own unique flair! You showed flashes of confidence in acceleration and moments of careful precision. Every driver has their signature style, and yours is authentically you. The car adapted beautifully to your rhythm.`;
}

// Quick reply categories with icons
const QUICK_REPLIES = [
    { label: '🚗 View Cars', msg: 'What cars are available?' },
    { label: '💰 Pricing', msg: 'What are your price ranges?' },
    { label: '📅 Book Test Drive', msg: 'I want to book a test drive' },
    { label: '📊 Drive Report', msg: 'Show me my driving report' },
    { label: '🏎️ Supercars', msg: 'Show me your supercars' },
    { label: '🎖️ Concierge', msg: 'What concierge services do you offer?' },
    { label: '💳 Finance', msg: 'What financing options are available?' },
    { label: '📍 Contact', msg: 'Where are you located?' },
];

// Test-drive intent patterns
const TEST_DRIVE_PATTERNS = [/test.?drive|book.?a?.?drive|book.?a?.?ride|schedule.?a?.?drive|want to drive|try.?a?.?car|appointment|schedule|experience.?a?.?car/i];

function getBotReply(msg) {
    const text = msg.trim();

    // Check driving report intent
    for (const pattern of DRIVING_REPORT_PATTERNS) {
        if (pattern.test(text)) return '__REPORT_TRIGGER__';
    }

    // Check test-drive intent first (handled separately by booking flow)
    for (const pattern of TEST_DRIVE_PATTERNS) {
        if (pattern.test(text)) return '__BOOKING_TRIGGER__';
    }

    for (const [, entry] of Object.entries(KB)) {
        if (!entry.patterns) continue;
        for (const pattern of entry.patterns) {
            if (pattern.test(text)) {
                if (Array.isArray(entry.replies)) {
                    return entry.replies[Math.floor(Math.random() * entry.replies.length)];
                }
                return entry.reply;
            }
        }
    }

    // Single-word brand fallbacks
    if (/corvette/i.test(text)) return "🇺🇸 **Chevrolet Corvette Z06** — $109,300\n\nMid-engine American supercar with a flat-plane 5.5L V8 revving to 8,600 RPM — a technical marvel at its price point. Track-ready straight from the factory. Shall I arrange a test drive?";
    if (/lucid/i.test(text)) return "🌙 **Lucid Air Dream Edition** — $169,000\n\nHolds the world record for longest EV range at 520 miles on a single charge. With 1,111 hp and a glass canopy roof, it reimagines what a luxury electric sedan can be.";

    return "I'm your dedicated automotive concierge 🎩 I can assist with:\n\n• **Car models & specifications**\n• **Pricing & financing**\n• **Test drive bookings**\n• **Concierge & VIP services**\n• **Brand comparisons**\n\nTry asking about a specific brand, category, or service!";
}

// Render markdown-lite: **bold** and newlines
function renderText(text) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part.split('\n').map((line, j) => (
            <span key={`${i}-${j}`}>{line}{j < part.split('\n').length - 1 && <br />}</span>
        ));
    });
}

// ─── Inline selection button styling ──────────────────────────────────────────
const chipStyle = {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    background: 'rgba(212,175,55,0.1)',
    border: '1px solid rgba(212,175,55,0.35)',
    color: '#d4af37',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    fontWeight: 500,
    whiteSpace: 'nowrap',
};

const chipHover = {
    background: 'rgba(212,175,55,0.25)',
    borderColor: 'rgba(212,175,55,0.6)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(212,175,55,0.15)',
};

// ─── Booking flow step labels ─────────────────────────────────────────────────
const BOOKING_STEPS = {
    car: { label: 'Select Vehicle', icon: '🚗' },
    date: { label: 'Choose Date', icon: '📅' },
    time: { label: 'Choose Time', icon: '⏰' },
    contact: { label: 'Your Details', icon: '👤' },
    confirm: { label: 'Confirm', icon: '✅' },
};

export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Welcome to **Luxury Auto Showcase** 🏎️ — I'm your personal automotive AI concierge. Ask me anything about our collection, pricing, test drives, or VIP services.",
            sender: 'bot',
            time: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const chatEndRef = useRef(null);

    // ─── Booking flow state ───────────────────────────────────────────────
    const [bookingActive, setBookingActive] = useState(false);
    const [bookingStep, setBookingStep] = useState(null); // 'car' | 'date' | 'time' | 'contact' | 'confirm'
    const [bookingData, setBookingData] = useState({ car: '', date: '', time: '', name: '', phone: '', email: '' });
    const [bookingSubmitting, setBookingSubmitting] = useState(false);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, isOpen]);

    const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add a bot message after a short delay
    const addBotMessage = (text, extraDelay = 0) => {
        return new Promise(resolve => {
            setIsTyping(true);
            const delay = 600 + Math.random() * 500 + extraDelay;
            setTimeout(() => {
                setMessages(prev => [...prev, { text, sender: 'bot', time: new Date() }]);
                setIsTyping(false);
                resolve();
            }, delay);
        });
    };

    // ─── Start Booking Flow ──────────────────────────────────────────────
    const startBookingFlow = async () => {
        setBookingActive(true);
        setBookingStep('car');
        setBookingData({ car: '', date: '', time: '', name: '', phone: '', email: '' });
        await addBotMessage("Wonderful! I'd be delighted to arrange a private test drive for you 🏎️\n\nWhich vehicle from our collection would you like to experience? Please select one below, or type the name of any car you'd like to drive.");
    };

    // ─── Cancel Booking ──────────────────────────────────────────────────
    const cancelBooking = async () => {
        setBookingActive(false);
        setBookingStep(null);
        setBookingData({ car: '', date: '', time: '', name: '', phone: '', email: '' });
        await addBotMessage("No problem at all. Your booking request has been cancelled. Feel free to ask me anything else — I'm here to help! ✨");
    };

    // ─── Handle Booking Step Input ───────────────────────────────────────
    const handleBookingInput = async (userText) => {
        // Cancel at any point
        if (/^(cancel|nevermind|stop|exit|quit|go back|back)\b/i.test(userText)) {
            await cancelBooking();
            return;
        }

        switch (bookingStep) {
            case 'car':
                await handleCarSelection(userText);
                break;
            case 'date':
                await handleDateInput(userText);
                break;
            case 'time':
                await handleTimeSelection(userText);
                break;
            case 'contact':
                await handleContactInput(userText);
                break;
            case 'confirm':
                await handleConfirmation(userText);
                break;
            default:
                break;
        }
    };

    const handleCarSelection = async (carName) => {
        setBookingData(prev => ({ ...prev, car: carName }));
        setBookingStep('date');
        await addBotMessage(`Excellent choice — the **${carName}** is a truly remarkable machine! 🔥\n\nWhen would you like to schedule your test drive? Please enter your preferred date (e.g. **2026-03-20** or **March 20**).`);
    };

    const handleDateInput = async (dateText) => {
        // Try to parse the date
        const parsed = parseDate(dateText);
        if (!parsed) {
            await addBotMessage("I wasn't quite able to parse that date. Could you please try again in a format like **2026-03-20** or **March 20, 2026**?");
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (parsed < today) {
            await addBotMessage("It seems that date is in the past. Could you please choose a future date for your test drive?");
            return;
        }
        const formatted = parsed.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        setBookingData(prev => ({ ...prev, date: formatDateISO(parsed) }));
        setBookingStep('time');
        await addBotMessage(`Perfect — **${formatted}** it is! ✨\n\nWhat time works best for you? Please select a slot below.`);
    };

    const handleTimeSelection = async (timeText) => {
        setBookingData(prev => ({ ...prev, time: timeText }));
        setBookingStep('contact');
        await addBotMessage(`**${timeText}** — noted! ⏰\n\nMay I have your details to confirm the appointment?\n\nPlease provide:\n• **Full Name**\n• **Phone Number**\n• **Email** (optional)\n\nYou can type them all at once, e.g.:\n*John Smith, +91 98765 43210, john@email.com*`);
    };

    const handleContactInput = async (text) => {
        // Parse contact — expecting: Name, Phone[, Email]
        const parts = text.split(/[,\n]+/).map(p => p.trim()).filter(Boolean);

        if (parts.length < 2) {
            await addBotMessage("I need at least your **name** and **phone number**, separated by a comma. For example:\n*John Smith, +91 98765 43210*");
            return;
        }

        const name = parts[0];
        const phone = parts[1];
        const email = parts.length >= 3 ? parts[2] : '';

        // Basic validation
        if (name.length < 2) {
            await addBotMessage("That name seems too short. Could you please provide your full name?");
            return;
        }
        if (!/\d{5,}/.test(phone.replace(/\s|-/g, ''))) {
            await addBotMessage("That doesn't look like a valid phone number. Please include your full phone number with area code.");
            return;
        }

        setBookingData(prev => ({ ...prev, name, phone, email }));
        setBookingStep('confirm');

        const dateDisplay = new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        let summary = `Here's your test drive booking summary:\n\n`;
        summary += `🚗 **Vehicle:** ${bookingData.car}\n`;
        summary += `📅 **Date:** ${dateDisplay}\n`;
        summary += `⏰ **Time:** ${bookingData.time}\n`;
        summary += `👤 **Name:** ${name}\n`;
        summary += `📞 **Phone:** ${phone}\n`;
        if (email) summary += `📧 **Email:** ${email}\n`;
        summary += `\nShall I confirm this booking? Type **Yes** to confirm or **No** to cancel.`;

        await addBotMessage(summary);
    };

    const handleConfirmation = async (text) => {
        if (/^(yes|confirm|sure|ok|yep|yeah|absolutely|go ahead|y)\b/i.test(text)) {
            await submitBooking();
        } else if (/^(no|nope|nah|cancel|n)\b/i.test(text)) {
            await cancelBooking();
        } else {
            await addBotMessage("Please type **Yes** to confirm the booking or **No** to cancel.");
        }
    };

    const submitBooking = async () => {
        setBookingSubmitting(true);
        setIsTyping(true);
        try {
            const res = await fetch(`${API_BASE}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    car: bookingData.car,
                    name: bookingData.name,
                    phone: bookingData.phone,
                    email: bookingData.email || 'N/A',
                    datetime: `${bookingData.date} at ${bookingData.time}`,
                    status: 'Pending'
                })
            });

            setIsTyping(false);

            if (res.ok) {
                const dateDisplay = new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                let successMsg = `✅ **Booking Confirmed!**\n\n`;
                successMsg += `Your private test drive for the **${bookingData.car}** has been scheduled for **${dateDisplay}** at **${bookingData.time}**.\n\n`;
                successMsg += `Our concierge team will reach out to **${bookingData.phone}** within 2 hours to confirm your appointment.\n\n`;
                successMsg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
                successMsg += `🌟 **Premium Experience Options:**\n`;
                successMsg += `• **VIP Private Showroom** — An after-hours exclusive session with champagne service\n`;
                successMsg += `• **Home Delivery Test Drive** — We bring the car to your door\n\n`;
                successMsg += `Would you like to upgrade to a VIP experience, or is there anything else I can help with?`;

                setMessages(prev => [...prev, { text: successMsg, sender: 'bot', time: new Date() }]);
                setBookingActive(false);
                setBookingStep(null);
            } else {
                const error = await res.json();
                if (res.status === 409) {
                    setMessages(prev => [...prev, {
                        text: `⚠️ **Slot Unavailable**\n\n${error.message || 'This time slot is already booked for this vehicle.'}\n\nWould you like to choose a **different time**? I'll show you the available slots again.`,
                        sender: 'bot',
                        time: new Date()
                    }]);
                    // Go back to time selection
                    setBookingStep('time');
                    setBookingData(prev => ({ ...prev, time: '' }));
                } else {
                    setMessages(prev => [...prev, {
                        text: `❌ **Booking Error**\n\n${error.message || 'Something went wrong.'} Please try again or contact us directly at **+1 (800) LUXURY-1**.`,
                        sender: 'bot',
                        time: new Date()
                    }]);
                    setBookingActive(false);
                    setBookingStep(null);
                }
            }
        } catch (err) {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                text: `❌ **Connection Error**\n\nI couldn't reach our booking system at the moment. Please try again in a few moments or call us at **+1 (800) LUXURY-1** to arrange your test drive.`,
                sender: 'bot',
                time: new Date()
            }]);
            setBookingActive(false);
            setBookingStep(null);
        } finally {
            setBookingSubmitting(false);
        }
    };

    // ─── Generate Driving Report ─────────────────────────────────────────
    const generateDrivingReport = async (carName) => {
        const vehicle = carName || bookingData.car || 'your selected vehicle';
        const scores = generateDrivingMetrics();
        const badge = getDrivingBadge(scores);
        const summary = getDrivingSummary(scores, badge);

        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
        setIsTyping(false);

        // Build the report message
        let report = `🏁 **TEST DRIVE PERFORMANCE REPORT**\n`;
        report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        report += `🚗 **Vehicle:** ${vehicle}\n\n`;
        report += `📊 **Your Driving Metrics:**\n`;
        report += `🎯 Driving Smoothness: **${scores.smoothness}/100**\n`;
        report += `🛑 Brake Control: **${scores.braking}/100**\n`;
        report += `⚡ Acceleration Pattern: **${scores.acceleration}/100**\n`;
        report += `🌱 Eco Driving Score: **${scores.eco}/100**\n\n`;
        report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        report += `🏅 **Driving Style Badge:** ${badge.badge}\n`;
        report += `*"${badge.desc}"*\n\n`;
        report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        report += `💬 **Driving Summary:**\n${summary}\n\n`;
        report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        report += `Looks like this car suits your driving style perfectly. Would you like me to **reserve it** or **schedule another test drive**?`;

        setMessages(prev => [...prev, {
            text: report,
            sender: 'bot',
            time: new Date(),
            isReport: true,
            reportData: { scores, badge }
        }]);
    };

    // ─── Main send handler ───────────────────────────────────────────────
    const sendMessage = async (text) => {
        const userText = (text || input).trim();
        if (!userText) return;

        setMessages(prev => [...prev, { text: userText, sender: 'user', time: new Date() }]);
        setInput('');
        setShowQuickReplies(false);

        // If booking flow is active, route to booking handler
        if (bookingActive) {
            await handleBookingInput(userText);
            return;
        }

        // Check if this triggers a special flow
        const reply = getBotReply(userText);
        if (reply === '__REPORT_TRIGGER__') {
            await generateDrivingReport();
            return;
        }
        if (reply === '__BOOKING_TRIGGER__') {
            await startBookingFlow();
            return;
        }

        // Normal KB reply
        setIsTyping(true);
        const delay = 800 + Math.random() * 700;
        setTimeout(() => {
            setMessages(prev => [...prev, { text: reply, sender: 'bot', time: new Date() }]);
            setIsTyping(false);
        }, delay);
    };

    // Handle car chip click (special — adds as user message, then processes)
    const handleCarChipClick = (carName) => {
        setMessages(prev => [...prev, { text: carName, sender: 'user', time: new Date() }]);
        handleCarSelection(carName);
    };

    // Handle time chip click
    const handleTimeChipClick = (time) => {
        setMessages(prev => [...prev, { text: time, sender: 'user', time: new Date() }]);
        handleTimeSelection(time);
    };

    const handleReset = () => {
        setMessages([{
            text: "Welcome back! 🏎️ How can I assist your automotive journey today?",
            sender: 'bot',
            time: new Date()
        }]);
        setShowQuickReplies(true);
        setInput('');
        setBookingActive(false);
        setBookingStep(null);
        setBookingData({ car: '', date: '', time: '', name: '', phone: '', email: '' });
    };

    // ─── Booking progress indicator ──────────────────────────────────────
    const renderBookingProgress = () => {
        if (!bookingActive || !bookingStep) return null;
        const steps = Object.keys(BOOKING_STEPS);
        const currentIdx = steps.indexOf(bookingStep);

        return (
            <div style={{
                padding: '10px 20px',
                background: 'rgba(212,175,55,0.06)',
                borderBottom: '1px solid rgba(212,175,55,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '4px',
            }}>
                {steps.map((step, idx) => {
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;
                    return (
                        <div key={step} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            opacity: isCompleted || isCurrent ? 1 : 0.35,
                        }}>
                            <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                background: isCompleted
                                    ? 'linear-gradient(135deg, #d4af37, #b8962a)'
                                    : isCurrent
                                        ? 'rgba(212,175,55,0.2)'
                                        : 'rgba(255,255,255,0.06)',
                                color: isCompleted ? '#0d1117' : isCurrent ? '#d4af37' : '#64748b',
                                border: isCurrent ? '1.5px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                                transition: 'all 0.3s',
                            }}>
                                {isCompleted ? '✓' : BOOKING_STEPS[step].icon}
                            </div>
                            <span style={{
                                fontSize: '0.62rem',
                                color: isCurrent ? '#d4af37' : isCompleted ? '#94a3b8' : '#475569',
                                fontWeight: isCurrent ? 600 : 400,
                                letterSpacing: '0.3px',
                                display: 'none', // hidden on narrow chat, shown via media later if needed
                            }}>
                                {BOOKING_STEPS[step].label}
                            </span>
                        </div>
                    );
                })}
                <button onClick={cancelBooking} title="Cancel booking" style={{
                    background: 'rgba(220,53,69,0.1)',
                    border: '1px solid rgba(220,53,69,0.3)',
                    borderRadius: '12px',
                    padding: '3px 10px',
                    color: '#dc3545',
                    fontSize: '0.68rem',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                }}>
                    Cancel
                </button>
            </div>
        );
    };

    // ─── Render car selection chips ──────────────────────────────────────
    const renderCarChips = () => {
        if (!bookingActive || bookingStep !== 'car') return null;
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '4px' }}
            >
                <div style={{
                    fontSize: '0.7rem',
                    color: '#64748b',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    Select a Vehicle
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {cars.map((car) => (
                        <button
                            key={car.id}
                            onClick={() => handleCarChipClick(car.name)}
                            style={chipStyle}
                            onMouseEnter={e => Object.assign(e.target.style, chipHover)}
                            onMouseLeave={e => Object.assign(e.target.style, {
                                background: chipStyle.background,
                                borderColor: chipStyle.border.split(' ').pop(),
                                transform: 'none',
                                boxShadow: 'none',
                            })}
                        >
                            {car.name}
                        </button>
                    ))}
                </div>
            </motion.div>
        );
    };

    // ─── Render time slot chips ──────────────────────────────────────────
    const renderTimeChips = () => {
        if (!bookingActive || bookingStep !== 'time') return null;
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '4px' }}
            >
                <div style={{
                    fontSize: '0.7rem',
                    color: '#64748b',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    Available Time Slots
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {TIME_SLOTS.map((slot) => (
                        <button
                            key={slot}
                            onClick={() => handleTimeChipClick(slot)}
                            style={chipStyle}
                            onMouseEnter={e => Object.assign(e.target.style, chipHover)}
                            onMouseLeave={e => Object.assign(e.target.style, {
                                background: chipStyle.background,
                                borderColor: chipStyle.border.split(' ').pop(),
                                transform: 'none',
                                boxShadow: 'none',
                            })}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </motion.div>
        );
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        style={{
                            position: 'fixed', bottom: '24px', right: '24px',
                            zIndex: 1050, width: '62px', height: '62px',
                            borderRadius: '50%', border: 'none', cursor: 'pointer',
                            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                            boxShadow: '0 0 0 0 rgba(212,175,55,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            animation: 'chatPulse 2.5s infinite'
                        }}
                    >
                        <MessageCircle size={28} color="#d4af37" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.92 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        style={{
                            position: 'fixed', bottom: '24px', right: '24px',
                            width: '400px', maxHeight: '640px',
                            background: 'linear-gradient(160deg, #0d1117 0%, #161b27 100%)',
                            borderRadius: '20px',
                            border: '1px solid rgba(212,175,55,0.2)',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
                            display: 'flex', flexDirection: 'column',
                            overflow: 'hidden', zIndex: 1050,
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '16px 20px',
                            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                            borderBottom: '1px solid rgba(212,175,55,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '38px', height: '38px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))',
                                    border: '1px solid rgba(212,175,55,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Bot size={20} color="#d4af37" />
                                </div>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
                                        AutoConcierge AI
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
                                        <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Online · Always available</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button onClick={handleReset} title="New conversation"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}>
                                    <RotateCcw size={16} />
                                </button>
                                <button onClick={() => setIsOpen(false)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}>
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Booking Progress Bar */}
                        {renderBookingProgress()}

                        {/* Messages */}
                        <div style={{
                            flex: 1, overflowY: 'auto', padding: '16px',
                            display: 'flex', flexDirection: 'column', gap: '12px',
                            scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,175,55,0.2) transparent'
                        }}>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
                                >
                                    {/* Report Card — visual score display */}
                                    {msg.isReport && msg.reportData ? (
                                        <div style={{
                                            maxWidth: '95%',
                                            width: '100%',
                                            borderRadius: '16px',
                                            background: 'linear-gradient(160deg, rgba(20,25,40,0.95), rgba(15,18,30,0.98))',
                                            border: `1px solid ${msg.reportData.badge.color}33`,
                                            overflow: 'hidden',
                                            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)`,
                                        }}>
                                            {/* Report Header */}
                                            <div style={{
                                                padding: '14px 16px',
                                                background: `linear-gradient(135deg, ${msg.reportData.badge.color}15, transparent)`,
                                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                                                textAlign: 'center',
                                            }}>
                                                <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#64748b', marginBottom: '4px' }}>
                                                    Test Drive Performance Report
                                                </div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>🏁</div>
                                            </div>

                                            {/* Score Bars */}
                                            <div style={{ padding: '14px 16px' }}>
                                                {[
                                                    { label: 'Driving Smoothness', value: msg.reportData.scores.smoothness, icon: '🎯', color: '#3b82f6' },
                                                    { label: 'Brake Control', value: msg.reportData.scores.braking, icon: '🛑', color: '#ef4444' },
                                                    { label: 'Acceleration', value: msg.reportData.scores.acceleration, icon: '⚡', color: '#f97316' },
                                                    { label: 'Eco Driving', value: msg.reportData.scores.eco, icon: '🌱', color: '#22c55e' },
                                                ].map((metric, mi) => (
                                                    <div key={mi} style={{ marginBottom: mi < 3 ? '12px' : 0 }}>
                                                        <div style={{
                                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                            marginBottom: '5px',
                                                        }}>
                                                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                                                {metric.icon} {metric.label}
                                                            </span>
                                                            <span style={{
                                                                fontSize: '0.8rem', fontWeight: 700,
                                                                color: metric.value >= 80 ? '#22c55e' : metric.value >= 60 ? '#d4af37' : '#ef4444',
                                                            }}>
                                                                {metric.value}/100
                                                            </span>
                                                        </div>
                                                        <div style={{
                                                            width: '100%', height: '8px', borderRadius: '4px',
                                                            background: 'rgba(255,255,255,0.06)',
                                                            overflow: 'hidden',
                                                        }}>
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${metric.value}%` }}
                                                                transition={{ duration: 1.2, delay: mi * 0.2, ease: 'easeOut' }}
                                                                style={{
                                                                    height: '100%',
                                                                    borderRadius: '4px',
                                                                    background: `linear-gradient(90deg, ${metric.color}99, ${metric.color})`,
                                                                    boxShadow: `0 0 8px ${metric.color}40`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Badge Display */}
                                            <div style={{
                                                padding: '14px 16px',
                                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                                textAlign: 'center',
                                                background: `linear-gradient(135deg, ${msg.reportData.badge.color}08, transparent)`,
                                            }}>
                                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#64748b', marginBottom: '6px' }}>
                                                    Your Driving Style
                                                </div>
                                                <div style={{
                                                    fontSize: '1.15rem', fontWeight: 800, color: msg.reportData.badge.color,
                                                    textShadow: `0 0 20px ${msg.reportData.badge.color}40`,
                                                    letterSpacing: '0.5px',
                                                }}>
                                                    {msg.reportData.badge.badge}
                                                </div>
                                                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '3px' }}>
                                                    "{msg.reportData.badge.desc}"
                                                </div>
                                            </div>

                                            {/* Summary Text */}
                                            <div style={{
                                                padding: '14px 16px',
                                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                                fontSize: '0.82rem',
                                                lineHeight: '1.6',
                                                color: '#cbd5e1',
                                            }}>
                                                {renderText(msg.text)}
                                            </div>
                                        </div>
                                    ) : (
                                        /* Standard message bubble */
                                        <div style={{
                                            maxWidth: '88%',
                                            padding: '11px 15px',
                                            borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                            background: msg.sender === 'user'
                                                ? 'linear-gradient(135deg, #d4af37, #b8962a)'
                                                : 'rgba(255,255,255,0.06)',
                                            color: msg.sender === 'user' ? '#0d1117' : '#e2e8f0',
                                            fontSize: '0.875rem',
                                            lineHeight: '1.55',
                                            border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                                            fontWeight: msg.sender === 'user' ? 600 : 400,
                                        }}>
                                            {renderText(msg.text)}
                                        </div>
                                    )}
                                    <span style={{ fontSize: '0.7rem', color: '#475569', marginTop: '3px', paddingLeft: 2, paddingRight: 2 }}>
                                        {formatTime(msg.time)}
                                    </span>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: '18px 18px 18px 4px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{
                                            width: '7px', height: '7px', borderRadius: '50%',
                                            background: '#d4af37', opacity: 0.7,
                                            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`
                                        }} />
                                    ))}
                                </motion.div>
                            )}

                            {/* Car Selection Chips (booking step: car) */}
                            {renderCarChips()}

                            {/* Time Slot Chips (booking step: time) */}
                            {renderTimeChips()}

                            {/* Quick Replies (normal mode only) */}
                            {showQuickReplies && !isTyping && !bookingActive && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '4px' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Quick Topics
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {QUICK_REPLIES.map((qr, i) => (
                                            <button key={i} onClick={() => sendMessage(qr.msg)}
                                                style={{
                                                    padding: '6px 12px', borderRadius: '20px', fontSize: '0.78rem',
                                                    background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)',
                                                    color: '#d4af37', cursor: 'pointer', transition: 'all 0.2s',
                                                    fontFamily: 'inherit', fontWeight: 500
                                                }}
                                                onMouseEnter={e => { e.target.style.background = 'rgba(212,175,55,0.2)'; }}
                                                onMouseLeave={e => { e.target.style.background = 'rgba(212,175,55,0.1)'; }}
                                            >
                                                {qr.label}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div style={{
                            padding: '14px 16px',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(0,0,0,0.2)',
                            display: 'flex', gap: '10px', alignItems: 'center'
                        }}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                placeholder={
                                    bookingActive
                                        ? bookingStep === 'car' ? 'Type a car name or select above...'
                                        : bookingStep === 'date' ? 'e.g. 2026-03-20 or March 20...'
                                        : bookingStep === 'time' ? 'Select a time above or type one...'
                                        : bookingStep === 'contact' ? 'Name, Phone, Email (optional)...'
                                        : bookingStep === 'confirm' ? 'Type Yes or No...'
                                        : 'Type a message...'
                                        : 'Ask about our cars...'
                                }
                                style={{
                                    flex: 1, background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '24px', padding: '10px 18px',
                                    color: '#e2e8f0', fontSize: '0.875rem',
                                    outline: 'none', fontFamily: 'inherit',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.5)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || bookingSubmitting}
                                style={{
                                    width: '42px', height: '42px', borderRadius: '50%',
                                    background: input.trim() ? 'linear-gradient(135deg, #d4af37, #b8962a)' : 'rgba(255,255,255,0.06)',
                                    border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0, transition: 'all 0.2s'
                                }}
                            >
                                <Send size={17} color={input.trim() ? '#0d1117' : '#475569'} />
                            </button>
                        </div>

                        {/* CSS Animations */}
                        <style>{`
                            @keyframes chatPulse {
                                0% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
                                70% { box-shadow: 0 0 0 14px rgba(212,175,55,0); }
                                100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
                            }
                            @keyframes typingBounce {
                                0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
                                40% { transform: translateY(-5px); opacity: 1; }
                            }
                            @keyframes pulse {
                                0%, 100% { opacity: 1; }
                                50% { opacity: 0.4; }
                            }
                        `}</style>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// ─── Date parsing helpers ────────────────────────────────────────────────────
function parseDate(text) {
    const t = text.trim();

    // Try ISO format: 2026-03-20
    const isoMatch = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (isoMatch) {
        const d = new Date(+isoMatch[1], +isoMatch[2] - 1, +isoMatch[3]);
        if (!isNaN(d)) return d;
    }

    // Try DD/MM/YYYY or DD-MM-YYYY
    const slashMatch = t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (slashMatch) {
        const d = new Date(+slashMatch[3], +slashMatch[2] - 1, +slashMatch[1]);
        if (!isNaN(d)) return d;
    }

    // Try natural language: March 20, 2026 or March 20 or 20 March 2026
    const months = {
        jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
        apr: 3, april: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6,
        aug: 7, august: 7, sep: 8, september: 8, oct: 9, october: 9,
        nov: 10, november: 10, dec: 11, december: 11
    };

    // "March 20, 2026" or "March 20 2026" or "March 20"
    const naturalMatch1 = t.match(/^([a-z]+)\s+(\d{1,2})(?:[,\s]+(\d{4}))?$/i);
    if (naturalMatch1) {
        const monthIdx = months[naturalMatch1[1].toLowerCase()];
        if (monthIdx !== undefined) {
            const year = naturalMatch1[3] ? +naturalMatch1[3] : new Date().getFullYear();
            const d = new Date(year, monthIdx, +naturalMatch1[2]);
            if (!isNaN(d)) return d;
        }
    }

    // "20 March 2026" or "20 March"
    const naturalMatch2 = t.match(/^(\d{1,2})\s+([a-z]+)(?:[,\s]+(\d{4}))?$/i);
    if (naturalMatch2) {
        const monthIdx = months[naturalMatch2[2].toLowerCase()];
        if (monthIdx !== undefined) {
            const year = naturalMatch2[3] ? +naturalMatch2[3] : new Date().getFullYear();
            const d = new Date(year, monthIdx, +naturalMatch2[1]);
            if (!isNaN(d)) return d;
        }
    }

    // Fallback: try native Date parse
    const fallback = new Date(t);
    if (!isNaN(fallback) && fallback.getFullYear() > 2000) return fallback;

    return null;
}

function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
