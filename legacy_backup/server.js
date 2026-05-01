const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", (req, res) => {
  const msg = (req.body.message || "").toLowerCase();
  let reply = "";

  // Greetings
  if (/(hi|hello|hey|good morning|good evening)/.test(msg)) {
    reply = "Hello 👋 Welcome to our premium car showroom. How can I assist you today?";
  }

  // Price related
  else if (msg.includes("price") || msg.includes("cost")) {
    reply = "Sure 💰 Which car price would you like to know? BMW, Audi, Tesla, Lamborghini, Bugatti?";
  }

  // BMW
  else if (msg.includes("bmw")) {
    reply = "🚘 BMW M4 costs $72,000. It offers turbocharged power, sporty handling, and luxury interiors.";
  }

  // Audi
  else if (msg.includes("audi")) {
    reply = "🚘 Audi R8 is a V10 supercar priced at $142,000 with Quattro AWD and stunning design.";
  }

  // Tesla / Electric
  else if (msg.includes("tesla") || msg.includes("electric")) {
    reply = "⚡ Tesla Model S costs $89,000. It offers instant acceleration, autopilot, and zero emissions.";
  }

  // Luxury cars
  else if (msg.includes("luxury")) {
    reply = "✨ Our luxury cars include Rolls Royce, Bugatti Chiron, Lamborghini Huracán, and Range Rover Sport.";
  }

  // Cheapest
  else if (msg.includes("cheap") || msg.includes("affordable")) {
    reply = "💡 The most affordable sports car is Chevrolet Camaro starting at $52,000.";
  }

  // Test drive
  else if (msg.includes("test drive")) {
    reply = "📞 To book a test drive, click the 'Book Test Drive' button or call our manager at 9874561254.";
  }

  // Suggestions
  else if (msg.includes("suggest") || msg.includes("recommend")) {
    reply = "🤖 If you want speed → Lamborghini 🏎️ | Luxury → Rolls Royce ✨ | Electric → Tesla ⚡";
  }

  // Default fallback
  else {
    reply = "🤖 I can help with car prices, luxury cars, electric vehicles, or test drives. Try asking!";
  }

  setTimeout(() => {
    res.json({ reply });
  }, 1200); // typing effect
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
