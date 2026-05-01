// Force Google DNS to fix ISP DNS SRV query block (querySrv ECONNREFUSED)
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { execSync } = require('child_process');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-showroom';

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'Car Showroom API is running 🚗' });
});

// Kill any process using the port, then start listening
function startServer() {
    const server = app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️  Port ${PORT} in use — killing existing process...`);
            try {
                // Find and kill the process using the port (Windows)
                const result = execSync(
                    `netstat -ano | findstr :${PORT} | findstr LISTENING`,
                    { encoding: 'utf8' }
                );
                const pid = result.trim().split(/\s+/).pop();
                if (pid && pid !== '0') {
                    execSync(`taskkill /PID ${pid} /F`, { encoding: 'utf8' });
                    console.log(`✅ Killed process ${pid} on port ${PORT}. Restarting...`);
                }
            } catch (e) {
                console.error('Could not auto-kill port process:', e.message);
            }
            // Retry after a short delay
            setTimeout(startServer, 1500);
        } else {
            console.error('Server error:', err.message);
            process.exit(1);
        }
    });
}

// Connect to MongoDB, then start the server
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB:', MONGODB_URI);
        startServer();
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });
